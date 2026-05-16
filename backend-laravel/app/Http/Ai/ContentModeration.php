<?php

namespace App\Http\Ai;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ContentModeration
{
    public function moderateProduct(Product $product, array $frontendContext = []): array
    {
        $apiKey = env('OPENAI_API_KEY');

        if (!$apiKey) {
            return $this->blocked('Chưa cấu hình OPENAI_API_KEY nên không thể kiểm duyệt bằng AI.');
        }

        $major = DB::table('majors')
            ->where('major_id', $product->major_id)
            ->select('major_name', 'major_code')
            ->first();

        $imageUrl = $this->resolveImageUrl($product, $frontendContext);
        $payload = [
            'title' => $frontendContext['title'] ?? $product->title,
            'description' => $frontendContext['description'] ?? $product->description,
            'major' => $frontendContext['major'] ?? $major?->major_name ?? $major?->major_code ?? 'Không rõ',
            'image' => $imageUrl,
        ];

        if (!$imageUrl) {
            return $this->blocked('Sản phẩm chưa có ảnh để AI kiểm duyệt.');
        }

        $content = [
            [
                'type' => 'input_text',
                'text' => $this->buildPrompt($payload),
            ],
        ];

        if ($this->isSupportedImageReference($imageUrl)) {
            $content[] = [
                'type' => 'input_image',
                'image_url' => $imageUrl,
            ];
        }

        try {
            $messages = [
                [
                    'role' => 'system',
                    'content' => 'You are a strict content moderation system for a student scientific research platform. Return only valid JSON.',
                ],
                [
                    'role' => 'user',
                    'content' => $content,
                ],
            ];

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(45)->post('https://api.openai.com/v1/chat/completions', [
                'model' => env('OPENAI_VISION_MODEL', 'gpt-4o'),
                'messages' => $messages,
                'max_tokens' => 1000,
                'temperature' => 0.3,
            ]);

            if ($response->failed()) {
                Log::warning('AI content moderation failed', [
                    'product_id' => $product->product_id,
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return $this->blocked('Không thể kết nối AI kiểm duyệt lúc này, vui lòng thử lại.');
            }

            $text = data_get($response->json(), 'choices.0.message.content') ?? '';

            $result = $this->parseJson($text);

            if (!$result) {
                return $this->blocked('AI không trả về kết quả kiểm duyệt hợp lệ.');
            }

            $approved = (bool) ($result['approved'] ?? false);
            $violations = array_values(array_filter((array) ($result['violations'] ?? [])));
            $reason = trim((string) ($result['reason'] ?? ''));

            if (!$approved) {
                return [
                    'approved' => false,
                    'reason' => $reason ?: 'AI phát hiện nội dung không phù hợp.',
                    'violations' => $violations,
                    'raw' => $result,
                ];
            }

            return [
                'approved' => true,
                'reason' => $reason ?: 'Nội dung phù hợp để duyệt.',
                'violations' => $violations,
                'raw' => $result,
            ];
        } catch (\Throwable $e) {
            Log::warning('AI content moderation exception', [
                'product_id' => $product->product_id,
                'message' => $e->getMessage(),
            ]);

            return $this->blocked('Có lỗi khi AI kiểm duyệt nội dung, vui lòng thử lại.');
        }
    }

    private function buildPrompt(array $payload): string
    {
        $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

        return <<<PROMPT
You are a content moderation system for a student scientific research platform.

Analyze the product image and content.

Check:
- Whether the image is related to the product content
- Whether it is appropriate for an educational environment
- Whether it contains 18+, nudity, or sensitive content
- Whether it contains violence, gore, or dangerous content
- Whether it is spam, meme, or unserious content
- Whether it matches the selected major
- Whether it contains visible watermarks, obvious stock-photo marks, or signs of stolen content

Product data:
{$json}

Return only JSON in this exact shape:
{
  "approved": true,
  "reason": "Vietnamese explanation for the teacher",
  "violations": [],
  "checks": {
    "image_related": true,
    "educational": true,
    "adult_or_sensitive": false,
    "violence_or_danger": false,
    "spam_or_meme": false,
    "major_match": true,
    "watermark_or_stolen_signal": false
  }
}

Set approved to false if any serious violation is detected.
PROMPT;
    }

    private function resolveImageUrl(Product $product, array $frontendContext): ?string
    {
        $imageUrl = $frontendContext['image'] ?? $frontendContext['thumbnail'] ?? $product->thumbnail;

        if (!$imageUrl) {
            $imageUrl = DB::table('product_images')
                ->where('product_id', $product->product_id)
                ->value('image_url');
        }

        if (!$imageUrl) {
            return null;
        }

        $imageUrl = trim((string) $imageUrl);

        if (Str::startsWith($imageUrl, ['http://', 'https://', 'data:image/'])) {
            return $imageUrl;
        }

        return rtrim(config('app.url'), '/') . '/' . ltrim($imageUrl, '/');
    }

    private function isSupportedImageReference(string $imageUrl): bool
    {
        return Str::startsWith($imageUrl, ['http://', 'https://', 'data:image/']);
    }

    private function parseJson(string $text): ?array
    {
        $decoded = json_decode($text, true);

        if (is_array($decoded)) {
            return $decoded;
        }

        if (preg_match('/\{.*\}/s', $text, $matches)) {
            $decoded = json_decode($matches[0], true);
            return is_array($decoded) ? $decoded : null;
        }

        return null;
    }

    private function blocked(string $reason): array
    {
        return [
            'approved' => false,
            'reason' => $reason,
            'violations' => [$reason],
            'raw' => null,
        ];
    }
}

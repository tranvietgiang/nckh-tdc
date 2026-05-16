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
            return $this->blocked('Missing OPENAI_API_KEY');
        }

        $major = DB::table('majors')
            ->where('major_id', $product->major_id)
            ->select('major_name', 'major_code')
            ->first();

        $imageUrl = $this->resolveImageUrl($product, $frontendContext);

        if (!$imageUrl) {
            return $this->blocked('No image found for moderation');
        }

        $payload = [
            'title' => $frontendContext['title'] ?? $product->title,
            'description' => $frontendContext['description'] ?? $product->description,
            'major' => $frontendContext['major']
                ?? $major?->major_name
                ?? $major?->major_code
                ?? 'Unknown',
            'image' => $imageUrl,
        ];

        $content = [
            [
                'type' => 'text',
                'text' => $this->buildPrompt($payload),
            ],
        ];

        // image (ONLY if valid url)
        if ($this->isSupportedImageReference($imageUrl)) {
            $content[] = [
                'type' => 'image_url',
                'image_url' => [
                    'url' => $imageUrl,
                ],
            ];
        }

        try {
            $messages = [
                [
                    'role' => 'system',
                    'content' => 'Return ONLY valid JSON. No explanation. No markdown.',
                ],
                [
                    'role' => 'user',
                    'content' => $content,
                ],
            ];

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ])
                ->timeout(45)
                ->post('https://api.openai.com/v1/chat/completions', [
                    'model' => env('OPENAI_VISION_MODEL', 'gpt-4o-mini'),
                    'messages' => $messages,
                    'temperature' => 0.2,
                    'max_tokens' => 1000,
                ]);

            // ❌ REAL API ERROR
            if ($response->failed()) {
                Log::error('OpenAI moderation API failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                    'product_id' => $product->product_id,
                ]);

                return [
                    'approved' => false,
                    'reason' => 'AI API error: ' . $response->body(),
                    'violations' => ['api_error'],
                    'raw' => null,
                ];
            }

            $text = data_get($response->json(), 'choices.0.message.content');

            if (!$text) {
                return $this->blocked('Empty AI response');
            }

            $result = $this->parseJson($text);

            if (!$result) {
                Log::warning('Invalid AI JSON', [
                    'response' => $text,
                ]);

                return $this->blocked('Invalid AI response format');
            }

            $approved = (bool) ($result['approved'] ?? false);
            $violations = array_values(array_filter($result['violations'] ?? []));
            $reason = trim($result['reason'] ?? '');

            // ✅ reduce false positive (important)
            if (!$approved && count($violations) === 0) {
                return [
                    'approved' => true,
                    'reason' => 'Auto-approved (no strong violations)',
                    'violations' => [],
                    'raw' => $result,
                ];
            }

            return [
                'approved' => $approved,
                'reason' => $reason ?: ($approved ? 'OK' : 'Rejected by AI'),
                'violations' => $violations,
                'raw' => $result,
            ];
        } catch (\Throwable $e) {
            Log::error('AI moderation exception', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return $this->blocked($e->getMessage());
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

    private function safeJson($data): string
    {
        return json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

    private function parseJson(string $text): ?array
    {
        $text = trim($text);

        // remove markdown
        $text = preg_replace('/```json|```/', '', $text);

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

    private function resolveImageUrl(Product $product, array $frontendContext): ?string
    {
        $imageUrl = $frontendContext['image']
            ?? $frontendContext['thumbnail']
            ?? $product->thumbnail;

        if (!$imageUrl) {
            $imageUrl = DB::table('product_images')
                ->where('product_id', $product->product_id)
                ->value('image_url');
        }

        if (!$imageUrl) {
            return null;
        }

        $imageUrl = trim($imageUrl);

        if (Str::startsWith($imageUrl, ['http://', 'https://', 'data:image/'])) {
            return $imageUrl;
        }

        return rtrim(config('app.url'), '/') . '/' . ltrim($imageUrl, '/');
    }

    private function isSupportedImageReference(string $imageUrl): bool
    {
        return Str::startsWith($imageUrl, ['http://', 'https://', 'data:image/']);
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

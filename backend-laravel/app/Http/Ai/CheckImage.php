<?php

namespace App\Http\Ai;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CheckImage
{
    protected $apiUser;
    protected $apiSecret;

    public function __construct()
    {
        $this->apiUser = config('services.sightengine.user');
        $this->apiSecret = config('services.sightengine.secret');
    }

   public function checkNSFW($file)
    {
            $base64 = base64_encode(file_get_contents($file->getRealPath()));

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
                'Content-Type'  => 'application/json',
            ])->post('https://api.openai.com/v1/responses', [
                'model' => 'gpt-4o',
                'input' => [
                    [
                        'role' => 'user',
                        'content' => [
                            [
                                'type' => 'input_text',
                                'text' => 'Kiểm tra ảnh này có chứa nội dung 18+, khỏa thân, gợi dục hay không. Chỉ trả JSON thuần, không markdown. Format:
        {
            "nsfw": true/false,
            "score": 0-1,
            "reason": "..."
        }'
                            ],
                            [
    'type' => 'input_image',
    'image_url' =>
        'data:' . $file->getMimeType() . ';base64,' . $base64
]
                        ]
                    ]
                ]
            ]);

            $result = $response->json();

            Log::info($result);

            if (!$response->successful()) {
                throw new \Exception('OpenAI lỗi: ' . json_encode($result));
            }

            // Lấy text response
            $text =
                $result['output'][0]['content'][0]['text']
                ?? $result['output_text']
                ?? null;

            if (!$text) {
                throw new \Exception('Không đọc được phản hồi từ OpenAI');
            }

            // Xóa markdown nếu có
            $cleanText = trim($text);
            $cleanText = preg_replace('/^```json\s*/i', '', $cleanText);
            $cleanText = preg_replace('/^```/', '', $cleanText);
            $cleanText = preg_replace('/```$/', '', $cleanText);
            $cleanText = trim($cleanText);

            $json = json_decode($cleanText, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \Exception('JSON không hợp lệ từ OpenAI: ' . $cleanText);
            }

            return [
                'nsfw'   => $json['nsfw'] ?? false,
                'score'  => $json['score'] ?? 0,
                'reason' => $json['reason'] ?? 'Không rõ',
            ];
        }
   
}

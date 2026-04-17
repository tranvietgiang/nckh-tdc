<?php

namespace App\Http\Ai;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CheckImage
{
    public function checkNSFW($file)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
            'Content-Type'  => 'application/json',
        ])->post('https://api.openai.com/v1/responses', [
            'model' => 'gpt-4.1',
            'input' => [
                [
                    'role' => 'user',
                    'content' => [
                        [
                            'type' => 'input_text',
                            'text' => 'Kiểm tra ảnh này có chứa nội dung 18+, khỏa thân, gợi dục hay không. Trả JSON dạng: {"nsfw": true/false, "score": 0-1, "reason": "..."}'
                        ],
                        [
                            'type' => 'input_image',
                            'image_url' => 'data:' . $file->getMimeType() . ';base64,' .
                                base64_encode(file_get_contents($file->getRealPath()))
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

        $text = $result['output'][0]['content'][0]['text'] ?? null;

        if (!$text) {
            throw new \Exception('Không đọc được phản hồi từ OpenAI');
        }

        $json = json_decode($text, true);

        if (!$json) {
            throw new \Exception('JSON không hợp lệ từ OpenAI: ' . $text);
        }

        return [
            'nsfw'   => $json['nsfw'] ?? false,
            'score'  => $json['score'] ?? 0,
            'reason' => $json['reason'] ?? 'Không rõ',
        ];
    }
}
<?php

namespace App\Http\Ai;

use OpenAI\Client;

class CheckImage
{
    protected $client;

    public function __construct()
    {
        $this->client = \OpenAI::client(config('services.openai.key'));
    }

    public function checkImage($imageUrl)
    {
        $response = $this->client->responses()->create([
            'model' => 'gpt-4.1-mini',
            'input' => [
                [
                    'role' => 'user',
                    'content' => [
                        [
                            'type' => 'input_text',
                            'text' => 'Kiểm tra ảnh này có nội dung nhạy cảm không. Trả về JSON: {"safe": true/false, "reason": ""}'
                        ],
                        [
                            'type' => 'input_image',
                            'image_url' => $imageUrl
                        ]
                    ]
                ]
            ]
        ]);

        return $response->output[0]->content[0]->text;
    }
}

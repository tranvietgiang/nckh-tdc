<?php

namespace App\Http\Ai;

class CheckImage
{
    protected $client;

    public function __construct()
    {
        $this->client = \OpenAI::client(config('services.openai.key'));
    }

    public function checkNSFW($file)
    {
        $imageData = base64_encode(file_get_contents($file->getRealPath()));

        $response = $this->client->responses()->create([
            'model' => 'gpt-4.1-nano',
            'max_output_tokens' => 20,
            'input' => [[
                'role' => 'user',
                'content' => [
                    [
                        'type' => 'input_text',
                        'text' => 'Is this image 18+? Return JSON only: {"nsfw": true/false}'
                    ],
                    [
                        'type' => 'input_image',
                        'image_url' => "data:image/jpeg;base64,$imageData"
                    ]
                ]
            ]]
        ]);

        return json_decode($response->output[0]->content[0]->text, true);
    }
}

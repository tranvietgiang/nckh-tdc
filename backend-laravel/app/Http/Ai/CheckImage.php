<?php

namespace App\Http\Ai;

use Illuminate\Support\Facades\Http;


class CheckImage
{

    public function checkImage($imageUrl)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
        ])->post('https://api.openai.com/v1/moderations', [
            'model' => 'omni-moderation-latest',
            'input' => $imageUrl
        ]);

        return $response->json();
    }
}

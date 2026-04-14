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
        $response = Http::attach(
            'media',
            file_get_contents($file->getRealPath()),
            $file->getClientOriginalName()
        )->post('https://api.sightengine.com/1.0/check.json', [
            'models' => 'nudity-2.1',
            'api_user' => $this->apiUser,
            'api_secret' => $this->apiSecret,
        ]);

        $result = $response->json();

        // THÊM ĐOẠN NÀY
        Log::info($result);

        // ❌ nếu API lỗi
        if (isset($result['error'])) {
            Log::error($result);

            throw new \Exception("Sightengine lỗi: " . $result['error']['message']);
        }

        // ❌ nếu không có dữ liệu nudity
        if (!isset($result['nudity'])) {
            Log::error("Không có nudity", $result);

            throw new \Exception("Không đọc được dữ liệu từ Sightengine");
        }
        // \Log::info($result); // 👉 debug

        $nudity = $result['nudity'] ?? [];

        $nsfwScore = max(
            $nudity['sexual_activity'] ?? 0,
            $nudity['sexual_display'] ?? 0,
            $nudity['erotica'] ?? 0
        );

        $suggestive = $nudity['suggestive'] ?? 0;

        // 🔥 CHẶN CẢ BIKINI
        $isNSFW = $nsfwScore > 0.2 || $suggestive > 0.5;
        // $result = $response->json();
        return [
            'nsfw' => $isNSFW,
            'score' => $nsfwScore,
            'suggestive' => $suggestive,
        ];
    }
}

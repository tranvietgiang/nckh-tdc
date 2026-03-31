<?php

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

use Illuminate\Http\Exceptions\ThrottleRequestsException;

public function render($request, Throwable $exception)
{
    if ($exception instanceof ThrottleRequestsException) {
        return response()->json([
            'message' => 'Không được spam API 😡, đợi 1 phút rồi thử lại!'
        ], 429);
    }

    return parent::render($request, $exception);
}
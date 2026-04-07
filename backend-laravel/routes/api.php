<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;


/*
|--------------------------------------------------------------------------
| AUTH ROUTES
|--------------------------------------------------------------------------
*/

// Xác thực người dùng
Route::post('/login', [AuthController::class, 'login']);

use Illuminate\Http\Request;

Route::options('/login', fn() => response('', 204));

Route::match(['GET', 'POST', 'OPTIONS'], '/ping', function (Request $request) {
    return response()->json([
        'ok' => true,
        'method' => $request->method(),
    ]);
});

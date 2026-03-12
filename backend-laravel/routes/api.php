<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| AUTH ROUTES
|--------------------------------------------------------------------------
*/

// Xác thực người dùng
Route::post('/login', [AuthController::class, 'login']);

// đăng xuất
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

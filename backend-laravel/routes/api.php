<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\MajorController;
use App\Http\Controllers\Api\ProductController;

/*
|--------------------------------------------------------------------------
| AUTH ROUTES
|--------------------------------------------------------------------------
*/

// Xác thực người dùng
Route::post('/login', [AuthController::class, 'login']);

// đăng xuất
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


/*
|--------------------------------------------------------------------------
| Majors ROUTES
|--------------------------------------------------------------------------
*/

Route::get('/major/{id}', [MajorController::class, 'majorName'])->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| product ROUTES
|--------------------------------------------------------------------------
*/
Route::get('/product/{id}', [ProductController::class, 'productViewId'])->middleware('auth:sanctum');

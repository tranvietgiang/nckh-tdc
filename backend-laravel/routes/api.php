<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\MajorController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\TeacherController;

/*
|--------------------------------------------------------------------------
| Auth ROUTES
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
| Product ROUTES
|--------------------------------------------------------------------------
*/
Route::get('/product/{id}', [ProductController::class, 'productViewId'])->middleware('auth:sanctum');
Route::get('/products', [ProductController::class, 'productAll'])->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| Teacher ROUTES
|--------------------------------------------------------------------------
*/
Route::get('/teacher/statistic', [TeacherController::class, 'getTeacherStatistic'])->middleware('auth:sanctum');
Route::get('/teacher', [TeacherController::class, 'getTeacherData'])->middleware('auth:sanctum');

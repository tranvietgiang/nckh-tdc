<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\MajorController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\TeacherController;
use App\Http\Controllers\Api\UploadController;

/*
|--------------------------------------------------------------------------
| Auth ROUTES
|--------------------------------------------------------------------------
*/

// Xác thực người dùng
Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:5,1');

Route::get('/me', [AuthController::class, 'me']); // trả user từ cookie
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

Route::middleware('auth:sanctum')->prefix('teacher')->group(function () {
    Route::get('/product/{product_id}', [ProductController::class, 'productViewIdTeacher']);
    Route::post('/product/{product_id}/approve', [TeacherController::class, 'teacherApprove']);
    Route::post('/product/reject', [TeacherController::class, 'teacherReject']);
});
/*
|--------------------------------------------------------------------------
| Teacher ROUTES
|--------------------------------------------------------------------------
*/
Route::get('/teacher/statistic', [TeacherController::class, 'getTeacherStatistic'])->middleware('auth:sanctum');
Route::get('/teacher', [TeacherController::class, 'getTeacherData'])->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| Upload ROUTES
|--------------------------------------------------------------------------
*/
Route::get('/upload/count-published', [UploadController::class, 'countPublishedProducts'])->middleware('auth:sanctum');
Route::post('/upload', [UploadController::class, 'upload'])
    ->middleware('auth:sanctum'); // guard token

/*
|--------------------------------------------------------------------------
| Categories ROUTES
|--------------------------------------------------------------------------
*/
Route::get('/category/all', [CategoryController::class, 'getAllCategories'])->middleware('auth:sanctum');

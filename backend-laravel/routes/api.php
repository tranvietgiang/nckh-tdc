<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
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
Route::middleware('auth:sanctum')->group(function () {});
Route::get('/major/{id}', [MajorController::class, 'majorName']);

/*
|--------------------------------------------------------------------------
| Product ROUTES
|--------------------------------------------------------------------------
*/


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/product/{id}', [ProductController::class, 'productViewId']);
    Route::get('/products', [ProductController::class, 'productAll']);
});

Route::middleware('auth:sanctum')->prefix('student')->group(function () {
    Route::post('/delete', [ProductController::class, 'deleteProductStudent']);
});

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
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/teacher/statistic', [TeacherController::class, 'getTeacherStatistic']);
    Route::get('/teacher', [TeacherController::class, 'getTeacherData']);
});

/*
|--------------------------------------------------------------------------
| Upload ROUTES
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/upload/count-published', [UploadController::class, 'countPublishedProducts']);
    Route::post('/upload', [UploadController::class, 'upload']); // guard token
});

/*
|--------------------------------------------------------------------------
| Categories ROUTES
|--------------------------------------------------------------------------
*/
Route::get('/category/all', [CategoryController::class, 'getAllCategories'])->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| Visitor ROUTES
|--------------------------------------------------------------------------
*/
Route::prefix('visitor')->group(function () {
    Route::get('/products', [ProductController::class, 'getProductsVisitor']);
    Route::get('/majors', [MajorController::class, 'getMajorAll']);
    Route::get('/product/{id}', [ProductController::class, 'getVisitorProductById']);
});


/*
|--------------------------------------------------------------------------
| test postman ROUTES
|--------------------------------------------------------------------------
*/
// Route::get('/test/{id}', [MajorController::class, 'demoDetail']);

Route::get('/demo-detail/{productId}', [ProductController::class, 'demoDetail']);

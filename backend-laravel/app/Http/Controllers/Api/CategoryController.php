<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CategoryService;

class CategoryController extends Controller
{
    public function __construct(protected CategoryService $category_service) {}

    public function getAllCategories()
    {
        $result = $this->category_service->getAllCategories();

        return response()->json([
            "data" => $result,
        ], 200);
    }
}

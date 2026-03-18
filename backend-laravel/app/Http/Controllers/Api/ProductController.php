<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ProductService;

class ProductController extends Controller
{
    //
    public function __construct(
        protected ProductService $productService
    ) {}

    public function productViewId(int $id)
    {
        $result =  $this->productService->getProductDetailById($id);
        if (!$result) {
            return response()->json([
                'message' => 'Không tìm sản phẩm cần tìm!',
            ], 404);
        }

        return response()->json(
            $result
        );
    }

    public function productAll()
    {
        $result = $this->productService->getAllProductsByUserId();
        return response()->json(
            $result
        );
    }
}

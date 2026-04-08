<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\ProductViewRequest;
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
                'message' => 'Không tìm thấy sản phẩm cần tìm!',
                'product_result' => false,
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

    public function productViewIdTeacher(ProductViewRequest $p_rq)
    {
        $result = $this->productService->productViewIdTeacher($p_rq->product_id);
        return response()->json(
            $result
        );
    }
}

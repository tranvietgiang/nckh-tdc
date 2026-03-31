<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ProductService;
use App\Services\UploadService;

class UploadController extends Controller
{
    public function __construct(
        protected UploadService $upload_service
    ) {}

    public function countPublishedProducts()
    {
        $return = $this->upload_service->countPublishedProducts();

        if (!$return) {
            return response()->json([
                'message' => "Đã xảy ra lỗi!",
                'uploadCount_result' => false
            ], 404);
        }

        return response()->json([
            'data' => $return,
            'uploadCount_result' => true
        ]);
    }
}

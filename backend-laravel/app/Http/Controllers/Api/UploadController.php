<?php

namespace App\Http\Controllers\Api;

use App\Http\Ai\CheckImage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ProductService;
use App\Services\UploadService;
use Illuminate\Container\Attributes\Auth;
use App\Http\Requests\UploadRequest;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Illuminate\Support\Facades\DB;

class UploadController extends Controller
{
    public function __construct(
        protected UploadService $upload_service,
        protected CheckImage $check_image
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

    public function upload2(UploadRequest $request)
    {

        try {
            $product = $this->upload_service->upload($request->validated());

            return response()->json([
                'message' => 'Tạo sản phẩm thành công',
                'data' => $product
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 422);
        }
    }
}

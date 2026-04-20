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

    public function upload(UploadRequest $request)
    {
        $product = $this->upload_service->upload($request->validated());

        // ❌ nếu có lỗi (ảnh vi phạm)
        if (isset($res['error']) && $res['error'] === true) {
            return response()->json([
                'status' => 'error',
                'message' => $res['message'],
                'image_index' => $res['image_index'] ?? null,
                'detail' => $res['detail'] ?? null
            ], 422);
        }

        //  nếu OK
        return response()->json([
            'status' => 'success',
            'message' => 'Tạo sản phẩm thành công',
            'data' => $product
        ], 200);
    }
}

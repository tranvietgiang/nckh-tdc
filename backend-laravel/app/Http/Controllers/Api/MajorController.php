<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\MajorService;

class MajorController extends Controller
{
    public function __construct(
        protected MajorService $majorService
    ) {}

    public function majorName(int $id)
    {
        $result = $this->majorService->getMajorNameById($id);

        if (!$result) {
            return response()->json([
                'message' => 'Không tìm thấy ngành'
            ], 404);
        }

        return response()->json([
            'major_name' => $result
        ]);
    }

    public function getMajorAll()
    {
        $result = $this->majorService->getAllMajors();

        return response()->json($result);
    }

    public function majorNameCode(int $id)
    {
        $result = $this->majorService->getMajorNameCodeById($id);

        if (!$result) {
            return response()->json([
                'message' => 'Không tìm thấy ngành'
            ], 404);
        }

        return response()->json(
            $result
        );
    }
}

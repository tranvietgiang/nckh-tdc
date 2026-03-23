<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TeacherService;

class TeacherController extends Controller
{

    public function __construct(
        protected TeacherService $teacherService
    ) {}

    public function getTeacherStatistic()
    {
        $return = $this->teacherService->teacherStatistic();

        if (!$return) {
            return response()->json([
                'message' => "Đã sảy ra lỗi!",
                'teacher_result' => false
            ]);
        }

        return response()->json([
            'data' => $return,
            'teacher_result' => true
        ]);
    }

    public function getTeacherData()
    {
        $return = $this->teacherService->showTeacherData();

        if (
            $return['pending_result']->isEmpty() &&
            $return['approved_result']->isEmpty() &&
            $return['rejected_result']->isEmpty()
        ) {
            return response()->json([
                'message' => 'không thể tải data!',
                'teacher_data_result' => false
            ], 404);
        }

        return response()->json([
            'data' => $return,
            'teacher_data_result' => true
        ]);
    }
}

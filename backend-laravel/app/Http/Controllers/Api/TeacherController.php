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
                'result_teacher' => false
            ]);
        }

        return response()->json([
            'data' => $return,
            'result_teacher' => true
        ]);
    }
}

<?php

namespace App\Services;

use App\Repositories\BaseRepository;
use App\Repositories\TeacherRepository;
use Illuminate\Support\Collection;

class TeacherService extends BaseRepository
{
    public function __construct(
        protected TeacherRepository $teacherRepository
    ) {}

    public function teacherStatistic(): ?array
    {
        $totalProduct = $this->teacherRepository->productStatistic();
        $totalRejectedProduct = $this->teacherRepository->rejectedStatistic();

        $data = [];

        if ($totalProduct !== null) {
            $data['total_product'] = $totalProduct;
        }

        if ($totalRejectedProduct !== null) {
            $data['total_rejectedProduct'] = $totalRejectedProduct;
        }

        return $data;
    }

    public function showTeacherData(): ?Collection
    {
        $pending =  $this->teacherRepository->pendingTeacherData();
        $approved =  $this->teacherRepository->approvedTeacherData();

        $data = collect();

        if ($pending !== null) {
            $data['pending_result'] = $pending;
        }

        if ($approved !== null) {
            $data['approved_result'] = $approved;
        }

        return $data;
    }
}

<?php

namespace App\Services;

use App\Repositories\BaseRepository;
use App\Repositories\TeacherRepository;

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
}

<?php

namespace App\Services;

use App\Repositories\MajorRepository;

class MajorService
{
    public function __construct(
        protected MajorRepository $majorRepository
    ) {}

    public function getMajorNameById(int $majorId): ?string
    {
        if (!$this->majorRepository->existsById($majorId)) {
            return null;
        }

        return $this->majorRepository->getNameById($majorId);
    }
}

<?php

namespace App\Services;

use App\Repositories\BaseRepository;
use App\Repositories\UploadRepository;

class UploadService extends BaseRepository
{
    public function __construct(
        protected UploadRepository $upload_repository
    ) {}

    public function countPublishedProducts(): ?int
    {
        return $this->upload_repository->countPublishedProducts();
    }
}

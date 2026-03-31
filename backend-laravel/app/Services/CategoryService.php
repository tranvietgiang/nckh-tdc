<?php

namespace App\Services;

use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Collection;

class CategoryService extends BaseRepository
{
    public function __construct(protected CategoryService $category_service) {}



    public function getAllCategories(): Collection
    {
        return $this->category_service->getAllCategories();
    }
}

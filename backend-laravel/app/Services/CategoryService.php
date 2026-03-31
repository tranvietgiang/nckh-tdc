<?php

namespace App\Services;

use App\Repositories\BaseRepository;
use App\Repositories\CategoryRepository;
use Illuminate\Database\Eloquent\Collection;


class CategoryService extends BaseRepository
{
    public function __construct(protected CategoryRepository $category_repository) {}


    public function getAllCategories(): Collection
    {
        return $this->category_repository->getAllCategories();
    }
}

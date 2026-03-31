<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository extends BaseRepository
{
    public function __construct(protected CategoryRepository $category_repository) {}

    public function getAllCategories(): array
    {
        return Category::all()->toArray();
    }
}

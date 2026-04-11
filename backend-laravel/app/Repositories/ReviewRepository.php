<?php

namespace App\Repositories;

use App\Models\Review;

class ReviewRepository extends BaseRepository
{
    public function create($data)
    {
        return Review::create($data);
    }
}

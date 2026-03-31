<?php

namespace App\Repositories;

use App\Models\User;

class UploadRepository extends BaseRepository
{
    public function countPublishedProducts(): ?int
    {
        $userId = $this->getCurrentUserId();
        return User::query()
            ->join('products', 'users.user_id', '=', 'products.user_id')
            ->where('products.status', 'approved')
            ->where('users.user_id', $userId)->count();
    }
}

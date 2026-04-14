<?php

namespace App\Repositories\common;

use App\Models\User;
use App\Repositories\BaseRepository;

class CommonRepository extends BaseRepository
{
    public function getMajorId()
    {
        return User::where('user_id', $this->getCurrentUserId())
            ->value('major_id') ?? 0;
    }
}

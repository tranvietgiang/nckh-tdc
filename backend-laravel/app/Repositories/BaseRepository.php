<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Auth;

class BaseRepository
{
    protected function getCurrentUserId(): ?string
    {
        return Auth::id();
    }
}

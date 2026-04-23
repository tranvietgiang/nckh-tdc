<?php

namespace App\Repositories;

use App\Models\Major;

class MajorRepository
{
    // chỉ lấy tên
    public function getNameById(int $majorId): ?string
    {
        return Major::where('major_id', $majorId)->value('major_name');
    }

    // kiểm tra major có tồn tại?
    public function existsById(int $majorId): ?bool
    {
        return Major::where('major_id', $majorId)->exists();
    }

    // lấy tất cả các ngành
    public function all()
    {
        return Major::all();
    }
}

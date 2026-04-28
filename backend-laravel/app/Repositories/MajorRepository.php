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

    public function getMajorCodeByProductId(int $idProduct): ?string
    {
        return Major::leftJoin('products as p', 'majors.major_id', '=', 'p.major_id')
            ->where('p.product_id', $idProduct)
            ->value('majors.major_code');
    }

    // lấy tất cả các ngành
    public function all()
    {
        return Major::all();
    }
}

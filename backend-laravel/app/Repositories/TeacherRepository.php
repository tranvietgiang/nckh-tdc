<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class TeacherRepository extends BaseRepository
{

    // trả về kết quả sau khi đếm được dựa vào id người dùng
    public function productStatistic(): ?int
    {
        $idUser = $this->getCurrentUserId();
        return Product::where('approved_by', $idUser)->count();
    }

    // trả về kết quả mà teacher từ chối
    public function rejectedStatistic(): ?int
    {
        $idUser = $this->getCurrentUserId();
        return Product::where('approved_by', $idUser)
            ->where('status', 'rejected')
            ->count();
    }

    // trả về sản phẩm đang chờ duyệt
    public function pendingTeacherData(): Collection
    {
        $idUser = $this->getCurrentUserId();
        return Product::query()
            ->leftJoin('majors', 'products.major_id', '=', 'majors.major_id')
            ->leftJoin('users', 'products.user_id', '=', 'users.user_id')
            ->leftJoin('categories', 'products.cate_id', '=', 'categories.cate_id')
            ->where('status', 'pending')
            ->where('approved_by', $idUser)
            ->select(
                'products.product_id',
                'products.title',
                'products.description',
                'products.thumbnail',
                'products.github_link',
                'products.demo_link',
                'products.status',
                'products.user_id',
                'products.major_id',
                'products.approved_by',
                'products.approved_at',
                'products.created_at',
                'products.updated_at',
                'majors.major_name',
                'majors.major_code',
                'categories.category_name',
                'categories.description as category_description',
                'users.name as student_fullname',
                'users.email as student_email',
                'users.class as student_class',
            )
            ->get();
    }

    // trả về sản phẩm đang chờ duyệt
    public function approvedTeacherData(): Collection
    {
        $idUser = $this->getCurrentUserId();
        return Product::query()
            ->leftJoin('majors', 'products.major_id', '=', 'majors.major_id')
            ->leftJoin('users', 'products.user_id', '=', 'users.user_id')
            ->leftJoin('categories', 'products.cate_id', '=', 'categories.cate_id')
            ->where('status', 'approved')
            ->where('approved_by', $idUser)
            ->select(
                'products.product_id',
                'products.title',
                'products.description',
                'products.thumbnail',
                'products.github_link',
                'products.demo_link',
                'products.status',
                'products.user_id',
                'products.major_id',
                'products.approved_by',
                'products.approved_at',
                'products.created_at',
                'products.updated_at',
                'majors.major_name',
                'majors.major_code',
                'categories.category_name',
                'categories.description as category_description',
                'users.name as student_fullname',
                'users.email as student_email',
                'users.class as student_class',
            )
            ->get();
    }
}

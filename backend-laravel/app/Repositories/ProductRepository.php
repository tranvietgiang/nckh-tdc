<?php

namespace App\Repositories;

use App\Models\Product;
use App\Repositories\Traits\HasCurrentUser;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class ProductRepository extends BaseRepository
{
    // kiểm tra sản phẩm có tồn tại bằng id
    public function productExists(int $productId): ?bool
    {
        return Product::where("product_id", $productId)->exists();
    }

    // tìm một sản phẩm bằng id chi tiết
    public function findProductById(int $productId): ?array
    {
        // return Product::join('users', "products.user_id", '=', "users.user_id")
        //     ->join('categories', 'products.cate_id', '=', 'categories.cate_id')
        //     ->join('majors', 'products.major_id', '=', 'majors.major_id')
        //     ->join('product_images', 'products.product_id', '=', 'product_images.product_id')
        //     ->join('product_files', 'products.product_id', '=', 'product_files.product_id')
        //     ->join('product_tags', 'products.product_id', '=', 'product_tags.product_id')
        //     ->join('product_statistics', 'products.product_id', '=', 'product_statistics.product_id')
        //     ->join('users', 'products.approved_by', '=', 'users.teacher_id')
        //     ->join('reviews', 'products.approved_by', '=', 'reviews.teacher_id')
        //     ->select()
        //     ->where('products.user_id', $userId)
        //     ->where("products.product_id", $productId)
        //     ->first(); code cũ sai

        $userId = $this->getCurrentUserId();
        $product = DB::table('products')
            ->join('categories', 'products.cate_id', '=', 'categories.cate_id')
            ->join('majors', 'products.major_id', '=', 'majors.major_id')
            ->leftJoin('users as approved_user', 'products.approved_by', '=', 'approved_user.user_id')
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
                'products.cate_id',
                'products.approved_by',
                'products.approved_at',
                'products.created_at',
                'products.updated_at',
                'majors.major_name',
                'majors.major_code',
                'categories.category_name',
                'categories.description as category_description',
                'approved_user.name as approved_by_fullname',
                'approved_user.email as approved_by_email',
                'approved_user.role as approved_by_role'
            )
            ->where('products.user_id', $userId)
            ->where('products.product_id', $productId)
            ->first();

        $images = DB::table('product_images')
            ->where('product_id', $productId)
            ->select('product_image_id', 'image_url', 'created_at')
            ->get();

        $files = DB::table('product_files')
            ->where('product_id', $productId)
            ->select('product_file_id', 'file_url', 'file_type', 'created_at')
            ->get();

        $tags = DB::table('product_tags')
            ->join('tags', 'product_tags.tag_id', '=', 'tags.tag_id')
            ->where('product_tags.product_id', $productId)
            ->select('tags.tag_id', 'tags.tag_name')
            ->get();

        $reviews = DB::table('reviews')
            ->leftJoin('users as teacher', 'reviews.teacher_id', '=', 'teacher.user_id')
            ->where('reviews.product_id', $productId)
            ->select(
                'reviews.review_id',
                'reviews.teacher_id',
                'reviews.comment',
                'reviews.created_at',
                'teacher.user_id as teacher_user_id',
                'teacher.name as teacher_fullname',
                'teacher.email as teacher_email',
                'teacher.role as teacher_role'
            )
            ->get();

        $statistics = DB::table('product_statistics')
            ->where('product_id', $productId)
            ->select('views', 'downloads', 'shares')
            ->first();


        $result = [
            'product_id' => $product->product_id,
            'title' => $product->title,
            'description' => $product->description,
            'thumbnail' => $product->thumbnail,
            'github_link' => $product->github_link,
            'demo_link' => $product->demo_link,
            'status' => $product->status,
            'user_id' => $product->user_id,
            'major_id' => $product->major_id,
            'cate_id' => $product->cate_id,
            'approved_by' => $product->approved_by,
            'approved_at' => $product->approved_at,
            'created_at' => $product->created_at,
            'updated_at' => $product->updated_at,

            'major' => [
                'major_id' => $product->major_id,
                'major_name' => $product->major_name,
                'major_code' => $product->major_code,
            ],

            'category' => [
                'cate_id' => $product->cate_id,
                'name' => $product->category_name,
                'description' => $product->category_description,
            ],

            'approved_by_user' => [
                'user_id' => $product->approved_by,
                'fullname' => $product->approved_by_fullname,
                'email' => $product->approved_by_email,
                'role' => $product->approved_by_role,
            ],

            'images' => $images,
            'files' => $files,
            'tags' => $tags,
            'reviews' => $reviews->map(function ($review) {
                return [
                    'review_id' => $review->review_id,
                    'teacher_id' => $review->teacher_id,
                    'comment' => $review->comment,
                    'created_at' => $review->created_at,
                    'teacher' => [
                        'user_id' => $review->teacher_user_id,
                        'fullname' => $review->teacher_fullname,
                        'email' => $review->teacher_email,
                        'role' => $review->teacher_role,
                    ],
                ];
            }),
            'activity_logs' => [
                'views' => $statistics->views ?? 0,
                'downloads' => $statistics->downloads ?? 0,
                'shares' => $statistics->shares ?? 0,
            ],
        ];

        return $result;
    }

    // lấy tất cả sản phẩm của học sinh theo id
    public function productAllById(): ?Collection
    {
        $userId = $this->getCurrentUserId();

        return Product::join('users', 'products.user_id', '=', 'users.user_id')
            ->join('categories', 'products.cate_id', '=', "categories.cate_id")
            ->join('product_statistics', 'products.product_id', '=', "product_statistics.product_id")
            ->where('products.user_id', $userId)
            ->select(
                'products.product_id',
                'products.title',
                'products.thumbnail',
                'products.description',
                'products.status',
                'categories.category_name',
                'products.submitted_at',
                'product_statistics.views',
                'product_statistics.likes',
                // 'products.feedback'
            )->get();
    }
}

<?php

namespace App\Repositories;

use App\Models\Product;
use App\Repositories\Traits\HasCurrentUser;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProductRepository extends BaseRepository
{
    // kiểm tra sản phẩm có tồn tại bằng id
    public function productExists(int $productId): bool
    {
        return Product::where("product_id", $productId)->exists();
    }

    // tìm một sản phẩm bằng id chi tiết
    public function findProductById(int $productId): ?array
    {
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

        return Product::query()
            ->leftJoin('categories', 'products.cate_id', '=', 'categories.cate_id')
            ->leftJoin('product_statistics', 'products.product_id', '=', 'product_statistics.product_id')
            ->where('products.user_id', $userId)
            ->select(
                'products.product_id',
                'products.title',
                'products.thumbnail',
                'products.description',
                'products.status',
                'categories.category_name',
                'products.submitted_at',
                DB::raw('COALESCE(product_statistics.views, 0) as views'),
                DB::raw('COALESCE(product_statistics.likes, 0) as likes'),

                // 👉 lấy 1 comment mới nhất
                DB::raw('(SELECT comment FROM reviews 
                      WHERE reviews.product_id = products.product_id 
                      ORDER BY reviews.created_at DESC 
                      LIMIT 1) as feedback')
            )
            ->orderByDesc('products.created_at')
            ->get();
    }

    public function productViewIdTeacher($productId)
    {
        $product = DB::table('products')
            ->join('categories', 'products.cate_id', '=', 'categories.cate_id')
            ->join('majors', 'products.major_id', '=', 'majors.major_id')
            ->leftJoin('users as approved_user', 'products.approved_by', '=', 'approved_user.user_id')
            ->leftJoin('users as student', 'products.user_id', '=', 'student.user_id')

            // 👇 JOIN ảnh (lấy 1 ảnh làm thumbnail)
            ->leftJoin('product_images as pi', function ($join) {
                $join->on('products.product_id', '=', 'pi.product_id');
            })

            ->select(
                'products.*',
                'majors.major_name',
                'majors.major_code',
                'categories.category_name',
                'categories.description as category_description',

                'approved_user.name as approved_by_fullname',
                'student.name as student_name',
                'student.email as student_email',
                'student.role as student_role',
                'student.class as student_class',
                'student.user_id as student_id',
            )

            ->where('products.product_id', $productId)
            ->where('student.role', 'student')
            ->whereIn('products.status', ['pending', 'rejected', 'approved'])

            ->groupBy(
                'products.product_id',
                'majors.major_name',
                'majors.major_code',
                'categories.category_name',
                'categories.description',
                'approved_user.name',
                'student.name',
                'student.email'
            )

            ->first();

        if (!$product) {
            return null;
        }

        $images = DB::table('product_images')
            ->where('product_id', $productId)
            ->get();

        $files = DB::table('product_files')
            ->where('product_id', $productId)
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
                'reviews.comment',
                'reviews.created_at',
                'teacher.name as teacher_name'
            )
            ->get();

        $author = [
            'name'  => $product->student_name,
            'email' => $product->student_email,
            'role' => $product->student_role,
            'class' => $product->student_class,
            'mssv' => $product->student_id
        ];

        unset(
            $product->student_name,
            $product->student_email,
            $product->student_role,
            $product->student_class,
            $product->student_id,
        );

        return [
            'product' => $product,
            'author'  => $author,
            'images'  => $images,
            'files'   => $files,
            'tags'    => $tags,
            'reviews' => $reviews,
        ];
    }

    // Duyệt sản phẩm
    public function update(Product $product, array $data): bool
    {
        return $product->update($data);
    }



    public function findByIdPAndIdMajor($productId, $majorId): ?Product
    {
        return Product::where('product_id', $productId)
            ->where('major_id', $majorId)
            ->first();
    }

    public function getProductsVisitor(): array
    {
        return DB::table('products as p')
            ->join('majors as m', 'p.major_id', '=', 'm.major_id')
            ->leftJoin('product_statistics as s', 'p.product_id', '=', 's.product_id')
            ->leftJoin('categories as c', 'p.cate_id', '=', 'c.cate_id')
            ->leftJoin('users as u', 'p.user_id', '=', 'u.user_id')
            ->leftJoin('users as gv', 'p.approved_by', '=', 'gv.user_id')
            ->where('p.status', 'approved')
            ->orderByDesc('p.created_at')
            ->select(
                'p.product_id as id',
                'p.title',
                'p.description',
                'p.thumbnail',
                'p.created_at',
                'p.cate_id',

                'm.major_id',
                'm.major_name as major',

                'u.name as student',
                'u.user_id as studentId',

                'gv.name as advisor',

                'c.category_name as type',

                's.views',
                's.likes'
            )
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'title' => $p->title,
                'cate_id' => $p->cate_id,
                'description' => $p->description,
                'thumbnail' => $p->thumbnail,

                'year' => $p->created_at
                    ? date('Y', strtotime($p->created_at))
                    : null,

                //sv
                'student' => $p->student ?? 'Ẩn danh',
                'studentId' => $p->studentId ?? null,

                'major_id' => $p->major_id,
                'major' => $p->major,

                'type' => $p->type ?? null,

                'views' => (int) ($p->views ?? 0),
                'likes' => (int) ($p->likes ?? 0),

                //gv duyệt
                'advisor' => $p->advisor ?? null,
            ])
            ->toArray();
    }
}

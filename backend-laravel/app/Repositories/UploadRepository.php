<?php

namespace App\Repositories;

use App\Models\Product;
use App\Models\ProductFile;
use App\Models\ProductImage;
use App\Models\ProductTag;
use App\Models\User;
use App\Repositories\MajorRepository;

use function Symfony\Component\Clock\now;

class UploadRepository extends BaseRepository
{

    public function __construct(
        protected MajorRepository $major_repository
    ) {}

    public function countPublishedProducts(): ?int
    {
        $userId = $this->getCurrentUserId();
        return User::query()
            ->join('products', 'users.user_id', '=', 'products.user_id')
            ->where('products.status', 'approved')
            ->where('users.user_id', $userId)->count();
    }

    /**
     * Upload product và liên quan
     */
    public function upload(array $data, array $uploadedImages, array $uploadedFiles, array $tagIds): Product
    {
        $thumbnail = $uploadedImages[0];
        $otherImages = array_slice($uploadedImages, 1);

        // 1 Tạo product chính
        $product = Product::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'thumbnail' => $thumbnail,
            'github_link' => $data['github_link'] ?? null,
            'demo_link' => $data['demo_link'] ?? null,
            'status' => 'pending',
            'user_id' => $this->getCurrentUserId(),
            'cate_id' => $data['cate_id'],
            'major_id' => $data['major_id'],
            'files' => json_encode($uploadedFiles), // lưu mảng ID file
            'tags' => json_encode($tagIds), // lưu mảng ID tag
            'approved_by' => null,
            'submitted_at' => now()->format('Y-m-d')
        ]);


        // 2 Lưu ProductFiles
        foreach ($uploadedFiles as $fileId) {
            ProductFile::create([
                'product_id' => $product->product_id,
                'file_id' => $fileId,
            ]);
        }

        // 3 Lưu ProductImages
        foreach ($otherImages as $imageUrl) {
            ProductImage::create([
                'product_id' => $product->product_id,
                'image_url' => $imageUrl,
            ]);
        }

        // 4 Lưu ProductTags
        foreach ($tagIds as $tagId) {
            ProductTag::create([
                'product_id' => $product->product_id,
                'tag_id' => $tagId,
            ]);
        }

        return $product;
    }
}

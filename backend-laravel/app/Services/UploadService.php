<?php

namespace App\Services;

use App\Repositories\BaseRepository;
use App\Repositories\UploadRepository;
use Illuminate\Support\Facades\Storage;
use App\Http\Ai\CheckImage;
use Illuminate\Support\Facades\DB;

class UploadService extends BaseRepository
{
    public function __construct(
        protected UploadRepository $upload_repository,
        protected CheckImage $Check_ai_image
    ) {}



    /**
     * Xử lý upload + check AI + lưu DB
     */
    public function upload(array $data)
    {
        $uploadedImages = [];
        $uploadedFiles = [];
        $tagIds = $data['tags'] ?? [];

        DB::beginTransaction();
        try {
            // Upload & check ảnh
            foreach ($data['images'] as $index => $image) {
                $path = $image->store('products', 'public');

                $result = $this->Check_ai_image->checkImage(url(Storage::url($path)));

                if (($result['results'][0]['flagged'] ?? false)) {
                    foreach ($uploadedImages as $img) Storage::delete($img);
                    Storage::delete($path);
                    throw new \Exception("Ảnh #$index vi phạm nội dung");
                }

                $uploadedImages[] = $path;
            }

            // Upload files
            if (!empty($data['files'])) {
                foreach ($data['files'] as $file) {
                    $uploadedFiles[] = $file->store('uploads/files', 'public');
                }
            }

            // Chuẩn bị dbData
            $dbData = [
                'title' => $data['title'],
                'description' => $data['description'],
                'user_id' => $this->getCurrentUserId(),
                'cate_id' => $data['cate_id'],
                'major_id' => $data['major_id'],
                'github_link' => $data['github_link'] ?? null,
                'demo_link' => $data['demo_link'] ?? null,
                // 'file_url' => $data['file_url'] ?? null
            ];

            // Gọi repository
            $product = $this->upload_repository->upload(
                $dbData,
                $uploadedImages,
                $uploadedFiles,
                $tagIds
            );

            // ✅ FIX CHÍNH Ở ĐÂY (convert URL cho React)
            $product->thumbnail = $uploadedImages[0]
                ? url(Storage::url($uploadedImages[0]))
                : null;

            $product->images = array_map(function ($img) {
                return url(Storage::url($img));
            }, $uploadedImages);

            DB::commit();
            return $product;
        } catch (\Exception $e) {
            DB::rollBack();

            foreach ($uploadedImages as $img) Storage::delete($img);
            foreach ($uploadedFiles as $file) Storage::delete($file);

            throw $e;
        }
    }

    public function countPublishedProducts(): ?int
    {
        return $this->upload_repository->countPublishedProducts();
    }
}

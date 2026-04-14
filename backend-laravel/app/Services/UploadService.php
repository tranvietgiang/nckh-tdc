<?php

namespace App\Services;

use App\Repositories\BaseRepository;
use App\Repositories\UploadRepository;
use App\Http\Ai\CheckImage;
use Illuminate\Support\Facades\DB;
use App\Services\CloudinaryService;
use Illuminate\Support\Facades\Log;

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

            $cloudinary = new CloudinaryService();

            foreach ($data['images'] as $index => $image) {

                $result = $this->Check_ai_image->checkNSFW($image);

                Log::info([
                    'index' => $index,
                    'nsfw' => $result['nsfw'],
                    'score' => $result['score'] ?? null,
                    'suggestive' => $result['suggestive'] ?? null,
                ]);

                if (!empty($result['nsfw'])) {
                    DB::rollBack();

                    return [
                        'error' => true,
                        // 'message' => 'Ảnh thứ ' . ($index + 1) . ' vi phạm nội dung',
                        'message' => 'Ảnh vi phạm nội dung',
                        'detail' => $result
                    ];
                }
            }

            if (!empty($data['files'])) {
                foreach ($data['files'] as $file) {
                    $uploadedFiles[] = $file->store('uploads/files', 'public');
                }
            }

            foreach ($data['images'] as $image) {
                $url = $cloudinary->upload($image);
                $uploadedImages[] = $url;
            }

            $dbData = [
                'title' => $data['title'],
                'description' => $data['description'],
                'user_id' => $this->getCurrentUserId(),
                'cate_id' => $data['cate_id'],
                'major_id' => $data['major_id'],
                'github_link' => $data['github_link'] ?? null,
                'demo_link' => $data['demo_link'] ?? null,
            ];

            $product = $this->upload_repository->upload(
                $dbData,
                $uploadedImages,
                $uploadedFiles,
                $tagIds
            );

            $product->thumbnail = $uploadedImages[0] ?? null;
            $product->images = $uploadedImages;

            DB::commit();

            return $product;
        } catch (\Exception $e) {

            DB::rollBack();

            throw $e;
        }
    }

    public function countPublishedProducts(): ?int
    {
        return $this->upload_repository->countPublishedProducts();
    }
}

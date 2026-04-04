<?php

namespace App\Services;

use App\Repositories\BaseRepository;
use App\Repositories\UploadRepository;
use App\Http\Ai\CheckImage;
use Illuminate\Support\Facades\DB;
use App\Services\CloudinaryService;

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
            // 🔥 Khởi tạo 1 lần (KHÔNG để trong loop)
            $cloudinary = new CloudinaryService();

            // 🔥 Upload + check AI
            foreach ($data['images'] as $index => $image) {

                // upload cloudinary
                $url = $cloudinary->upload($image);

                // check AI bằng URL thật
                $result = $this->Check_ai_image->checkImage($url);

                if (($result['results'][0]['flagged'] ?? false)) {
                    throw new \Exception("Ảnh #" . ($index + 1) . " vi phạm nội dung");
                }

                $uploadedImages[] = $url;
            }

            // 🔥 Upload files (giữ nguyên local nếu bạn muốn)
            if (!empty($data['files'])) {
                foreach ($data['files'] as $file) {
                    $uploadedFiles[] = $file->store('uploads/files', 'public');
                }
            }

            // 🔥 Data DB
            $dbData = [
                'title' => $data['title'],
                'description' => $data['description'],
                'user_id' => $this->getCurrentUserId(),
                'cate_id' => $data['cate_id'],
                'major_id' => $data['major_id'],
                'github_link' => $data['github_link'] ?? null,
                'demo_link' => $data['demo_link'] ?? null,
            ];

            // 🔥 Lưu DB
            $product = $this->upload_repository->upload(
                $dbData,
                $uploadedImages,
                $uploadedFiles,
                $tagIds
            );

            // 🔥 Trả URL luôn (KHÔNG dùng Storage nữa)
            $product->thumbnail = $uploadedImages[0] ?? null;
            $product->images = $uploadedImages;

            DB::commit();
            return $product;
        } catch (\Exception $e) {
            DB::rollBack();

            // ❗ Cloudinary không cần delete ở đây (muốn thì làm nâng cao sau)

            throw $e;
        }
    }

    public function countPublishedProducts(): ?int
    {
        return $this->upload_repository->countPublishedProducts();
    }
}

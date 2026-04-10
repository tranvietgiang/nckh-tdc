<?php

namespace App\Services;

use App\Repositories\BaseRepository;
use App\Repositories\ProductRepository;
use App\Repositories\TeacherRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\Collection;
use App\Repositories\common\CommonRepository as RepositoriesCommonRepository;
use Carbon\Carbon;

class TeacherService extends BaseRepository
{
    public function __construct(
        protected TeacherRepository $teacherRepository,
        protected ProductRepository $product_repository,
        protected UserRepository $user_repository,
        protected RepositoriesCommonRepository $common_repository
    ) {}

    public function teacherStatistic(): ?array
    {
        $totalProduct = $this->teacherRepository->productStatistic();
        $totalRejectedProduct = $this->teacherRepository->rejectedStatistic();

        $data = [];

        if ($totalProduct !== null) {
            $data['total_product'] = $totalProduct;
        }

        if ($totalRejectedProduct !== null) {
            $data['total_rejectedProduct'] = $totalRejectedProduct;
        }

        return $data;
    }


    public function showTeacherData(): Collection
    {
        $products = $this->teacherRepository->teacherAllData();

        return collect([
            'pending_result' => $products->where('status', 'pending')->values(),
            'approved_result' => $products->where('status', 'approved')->values(),
            'rejected_result' => $products->where('status', 'rejected')->values(),
        ]);
    }
    public function teacherApprove($product_id): array
    {
        $productId = (int) $product_id;

        $product = $this->teacherRepository->findForApprove(
            $productId,
            $this->common_repository->getMajorId()
        );

        if (!$product) {
            return [
                'teacher_approve_result' => false,
                'message_teacher_approve_result' => 'Sản phẩm không tồn tại!'
            ];
        }

        if ($product->status !== 'pending') {
            return [
                'teacher_approve_result' => false,
                'message_teacher_approve_result' => 'Sản phẩm không chờ duyệt!'
            ];
        }

        $product->update([
            'status' => 'approved',
            'approved_by' => $this->getCurrentUserId(),
            'approved_at' => Carbon::now()
        ]);

        return [
            'teacher_approve_result' => true,
            'message_teacher_approve_result' => 'Duyệt thành công!',
            'data' => $product
        ];
    }
}

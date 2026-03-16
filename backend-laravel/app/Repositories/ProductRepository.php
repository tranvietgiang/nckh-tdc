<?php

namespace App\Repositories;

use App\Models\Product;
use App\Repositories\Traits\HasCurrentUser;
use Illuminate\Database\Eloquent\Collection;

class ProductRepository extends BaseRepository
{
    // kiểm tra sản phẩm có tồn tại bằng id
    public function productExists(int $productId): ?bool
    {
        return Product::where("product_id", $productId)->exists();
    }

    // tìm một sản phẩm bằng id
    public function findProductById(int $productId): ?Product
    {
        return Product::where("product_id", $productId)->first();
    }

    // lấy tất cả sản phẩm của học sinh theo id
    public function productAllById(): ?Collection
    {
        $userId = $this->getCurrentUserId();

        return Product::join('users', 'products.user_id', '=', 'users.user_id')
            ->where('products.user_id', $userId)
            ->select(
                'products.*'
            )->get();
    }
}

<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository
{

    // kiểm tra sản phẩm có tồn tại bằng id
    public function productExists(int $productId): ?bool
    {
        return Product::where("product_id", $productId)->exists();
    }

    // tìm sản phẩm bằng id
    public function findProductById(int $productId): ?Product
    {
        return Product::where("product_id", $productId)->first();
    }
}

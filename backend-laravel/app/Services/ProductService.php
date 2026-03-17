<?php

namespace App\Services;

use App\Models\Product;
use App\Repositories\BaseRepository;
use App\Repositories\ProductRepository;
use Illuminate\Database\Eloquent\Collection;

class ProductService extends BaseRepository
{
    public function __construct(
        protected ProductRepository $productRepository
    ) {}

    public function getProductDetailById(int $productId): ?array
    {
        return $this->productRepository->findProductById($productId);
    }

    public function getAllProductsByUserId(): Collection
    {
        return $this->productRepository->productAllById();
    }
}

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
        if (!$this->productRepository->productExists($productId)) {
            return  null;
        };

        return $this->productRepository->findProductById($productId);
    }

    public function getAllProductsByUserId(): Collection
    {
        return $this->productRepository->productAllById();
    }

    public function productViewIdTeacher($productId): ?array
    {
        if (!$this->productRepository->productExists($productId)) {
            return  null;
        };

        return $this->productRepository->productViewIdTeacher($productId);
    }

    public function getProductsVisitor(): array
    {
        return $this->productRepository->getProductsVisitor();
    }
}

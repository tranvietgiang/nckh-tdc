<?php

namespace App\Services;

use App\Models\Product;
use App\Repositories\ProductRepository;

class ProductService
{
    public function __construct(
        protected ProductRepository $productRepository
    ) {}


    public function getProductById(int $productId): ?Product
    {

        return $this->productRepository->findProductById($productId);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductStatisticSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [];

        for ($productId = 1; $productId <= 40; $productId++) {
            $rows[] = [
                'product_id'   => $productId,
                'views'        => rand(100, 5000),
                'likes'        => rand(10, 500),
                'downloads'    => rand(0, 300),
                'shares'       => rand(0, 200),
                'created_at'   => now(),
                'updated_at'   => now(),
            ];
        }

        DB::table('product_statistics')->insert($rows);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductStatisticSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('product_statistics')->insert([
            [
                'product_id' => 1,
                'views' => 1234,
                'likes' => 89,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 2,
                'views' => 2341,
                'likes' => 156,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 3,
                'views' => 0,
                'likes' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 4,
                'views' => 0,
                'likes' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

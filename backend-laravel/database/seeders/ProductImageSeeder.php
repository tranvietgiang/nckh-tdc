<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductImageSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('product_images')->insert([
            // product 1
            [
                'product_image_id' => 1,
                'product_id' => 1,
                'image_url' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // product 2
            [
                'product_image_id' => 2,
                'product_id' => 2,
                'image_url' => 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_image_id' => 3,
                'product_id' => 2,
                'image_url' => 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_image_id' => 4,
                'product_id' => 2,
                'image_url' => 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // product 3
            [
                'product_image_id' => 5,
                'product_id' => 3,
                'image_url' => 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // product 4
            [
                'product_image_id' => 6,
                'product_id' => 4,
                'image_url' => 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

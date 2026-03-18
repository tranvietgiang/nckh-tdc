<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductTagSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('product_tags')->insert([
            // product 1 - TaskFlow
            [
                'product_id' => 1,
                'tag_id' => 5, // Laravel
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 1,
                'tag_id' => 6, // MySQL
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // product 2 - TechStore
            [
                'product_id' => 2,
                'tag_id' => 1, // React
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 2,
                'tag_id' => 2, // Node.js
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 2,
                'tag_id' => 3, // MongoDB
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 2,
                'tag_id' => 4, // TailwindCSS
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // product 3 - EasyEnglish
            [
                'product_id' => 3,
                'tag_id' => 1, // React
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 3,
                'tag_id' => 9, // AI
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // product 4 - Flappy Bird
            [
                'product_id' => 4,
                'tag_id' => 7, // Python
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 4,
                'tag_id' => 8, // Pygame
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

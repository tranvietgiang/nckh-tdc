<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductFileSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('product_files')->insert([
            // product 1
            [
                'product_file_id' => 1,
                'product_id' => 1,
                'file_url' => '/storage/products/taskflow/report.pdf',
                'file_type' => 'pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_file_id' => 2,
                'product_id' => 1,
                'file_url' => '/storage/products/taskflow/source.zip',
                'file_type' => 'zip',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // product 2
            [
                'product_file_id' => 3,
                'product_id' => 2,
                'file_url' => '/storage/products/techstore/report.pdf',
                'file_type' => 'pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_file_id' => 4,
                'product_id' => 2,
                'file_url' => '/storage/products/techstore/source.zip',
                'file_type' => 'zip',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_file_id' => 5,
                'product_id' => 2,
                'file_url' => '/storage/products/techstore/slide.pptx',
                'file_type' => 'pptx',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // product 3
            [
                'product_file_id' => 6,
                'product_id' => 3,
                'file_url' => '/storage/products/easyenglish/report.pdf',
                'file_type' => 'pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // product 4
            [
                'product_file_id' => 7,
                'product_id' => 4,
                'file_url' => '/storage/products/flappybird/source.zip',
                'file_type' => 'zip',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

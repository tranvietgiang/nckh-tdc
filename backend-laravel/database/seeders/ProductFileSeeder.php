<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductFileSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [];
        $fileId = 1;

        /*
        |--------------------------------------------------------------------------
        | Product 1 -> 10 : AI
        |--------------------------------------------------------------------------
        */

        for ($productId = 1; $productId <= 10; $productId++) {

            $rows[] = [
                'product_file_id' => $fileId++,
                'product_id' => $productId,
                'file_url' => "/storage/products/ai/product_$productId/report.pdf",
                'file_type' => 'pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $rows[] = [
                'product_file_id' => $fileId++,
                'product_id' => $productId,
                'file_url' => "/storage/products/ai/product_$productId/model.zip",
                'file_type' => 'zip',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $rows[] = [
                'product_file_id' => $fileId++,
                'product_id' => $productId,
                'file_url' => "/storage/products/ai/product_$productId/demo.pptx",
                'file_type' => 'pptx',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        /*
        |--------------------------------------------------------------------------
        | Product 11 -> 20 : CNTT
        |--------------------------------------------------------------------------
        */

        for ($productId = 11; $productId <= 20; $productId++) {

            $rows[] = [
                'product_file_id' => $fileId++,
                'product_id' => $productId,
                'file_url' => "/storage/products/cntt/product_$productId/report.pdf",
                'file_type' => 'pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $rows[] = [
                'product_file_id' => $fileId++,
                'product_id' => $productId,
                'file_url' => "/storage/products/cntt/product_$productId/source.zip",
                'file_type' => 'zip',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $rows[] = [
                'product_file_id' => $fileId++,
                'product_id' => $productId,
                'file_url' => "/storage/products/cntt/product_$productId/slide.pptx",
                'file_type' => 'pptx',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        /*
        |--------------------------------------------------------------------------
        | Product 21 -> 30 : MMT
        |--------------------------------------------------------------------------
        */

        for ($productId = 21; $productId <= 30; $productId++) {

            $rows[] = [
                'product_file_id' => $fileId++,
                'product_id' => $productId,
                'file_url' => "/storage/products/mmt/product_$productId/report.pdf",
                'file_type' => 'pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $rows[] = [
                'product_file_id' => $fileId++,
                'product_id' => $productId,
                'file_url' => "/storage/products/mmt/product_$productId/config.zip",
                'file_type' => 'zip',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $rows[] = [
                'product_file_id' => $fileId++,
                'product_id' => $productId,
                'file_url' => "/storage/products/mmt/product_$productId/topology.pkt",
                'file_type' => 'pkt',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        /*
        |--------------------------------------------------------------------------
        | Product 31 -> 40 : Graphic
        |--------------------------------------------------------------------------
        */

        for ($productId = 31; $productId <= 40; $productId++) {

            $rows[] = [
                'product_file_id' => $fileId++,
                'product_id' => $productId,
                'file_url' => "/storage/products/graphic/product_$productId/report.pdf",
                'file_type' => 'pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $rows[] = [
                'product_file_id' => $fileId++,
                'product_id' => $productId,
                'file_url' => "/storage/products/graphic/product_$productId/source.psd",
                'file_type' => 'psd',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $rows[] = [
                'product_file_id' => $fileId++,
                'product_id' => $productId,
                'file_url' => "/storage/products/graphic/product_$productId/mockup.ai",
                'file_type' => 'ai',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('product_files')->insert($rows);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductImageSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [];
        $imageId = 1;

        /*
        |--------------------------------------------------------------------------
        | Product 1 -> 10 : AI
        |--------------------------------------------------------------------------
        */

        for ($productId = 1; $productId <= 10; $productId++) {

            $rows[] = [
                'product_image_id' => $imageId++,
                'product_id' => $productId,
                'image_url' => 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $rows[] = [
                'product_image_id' => $imageId++,
                'product_id' => $productId,
                'image_url' => 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $rows[] = [
                'product_image_id' => $imageId++,
                'product_id' => $productId,
                'image_url' => 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800',
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
                'product_image_id' => $imageId++,
                'product_id' => $productId,
                'image_url' => 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $rows[] = [
                'product_image_id' => $imageId++,
                'product_id' => $productId,
                'image_url' => 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $rows[] = [
                'product_image_id' => $imageId++,
                'product_id' => $productId,
                'image_url' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
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
                'product_image_id' => $imageId++,
                'product_id' => $productId,
                'image_url' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $rows[] = [
                'product_image_id' => $imageId++,
                'product_id' => $productId,
                'image_url' => 'https://images.unsplash.com/photo-1563770660941-10a63607692e?w=800',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $rows[] = [
                'product_image_id' => $imageId++,
                'product_id' => $productId,
                'image_url' => 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800',
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
                'product_image_id' => $imageId++,
                'product_id' => $productId,
                'image_url' => 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $rows[] = [
                'product_image_id' => $imageId++,
                'product_id' => $productId,
                'image_url' => 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $rows[] = [
                'product_image_id' => $imageId++,
                'product_id' => $productId,
                'image_url' => 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('product_images')->insert($rows);
    }
}

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
        | DANH SÁCH 200 ẢNH GALLERY CHO NGÀNH AI (4 ảnh × 50 sản phẩm)
        |--------------------------------------------------------------------------
        */
        $aiGalleryImages = [
            'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/8386441/pexels-photo-8386441.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/8386442/pexels-photo-8386442.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/8386443/pexels-photo-8386443.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/8386444/pexels-photo-8386444.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/8386445/pexels-photo-8386445.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/8386446/pexels-photo-8386446.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/8386447/pexels-photo-8386447.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/8386448/pexels-photo-8386448.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/8386449/pexels-photo-8386449.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/8386450/pexels-photo-8386450.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/8386451/pexels-photo-8386451.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/8386452/pexels-photo-8386452.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/8386453/pexels-photo-8386453.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153355/pexels-photo-6153355.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153356/pexels-photo-6153356.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153357/pexels-photo-6153357.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153358/pexels-photo-6153358.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153359/pexels-photo-6153359.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153360/pexels-photo-6153360.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153361/pexels-photo-6153361.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153362/pexels-photo-6153362.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153363/pexels-photo-6153363.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153364/pexels-photo-6153364.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153365/pexels-photo-6153365.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153366/pexels-photo-6153366.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153367/pexels-photo-6153367.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153368/pexels-photo-6153368.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153369/pexels-photo-6153369.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153370/pexels-photo-6153370.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153371/pexels-photo-6153371.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153372/pexels-photo-6153372.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153373/pexels-photo-6153373.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153374/pexels-photo-6153374.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153375/pexels-photo-6153375.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153376/pexels-photo-6153376.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153377/pexels-photo-6153377.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/6153378/pexels-photo-6153378.jpeg?w=400&h=300&fit=crop',
        ];

        // Thêm 160 ảnh nữa để đủ 200...
        for ($j = 0; $j < 160; $j++) {
            $aiGalleryImages[] = 'https://images.pexels.com/photos/838644' . ($j % 10) . '/pexels-photo-838644' . ($j % 10) . '.jpeg?w=400&h=300&fit=crop';
        }

        // AI: Product ID 1 → 50
        for ($productId = 1; $productId <= 50; $productId++) {
            $offset = ($productId - 1) * 4;
            for ($i = 0; $i < 4; $i++) {
                $imageUrl = $aiGalleryImages[$offset + $i] ?? $aiGalleryImages[$i];
                $rows[] = [
                    'product_image_id' => $imageId++,
                    'product_id' => $productId,
                    'image_url' => $imageUrl,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // CNTT: Product ID 51 → 100
        $cnttGalleryImages = [
            'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181468/pexels-photo-1181468.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181269/pexels-photo-1181269.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181265/pexels-photo-1181265.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181242/pexels-photo-1181242.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181532/pexels-photo-1181532.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181466/pexels-photo-1181466.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181247/pexels-photo-1181247.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181264/pexels-photo-1181264.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/1181674/pexels-photo-1181674.jpeg?w=400&h=300&fit=crop',
        ];

        for ($j = 0; $j < 180; $j++) {
            $cnttGalleryImages[] = 'https://images.pexels.com/photos/118167' . ($j % 10) . '/pexels-photo-118167' . ($j % 10) . '.jpeg?w=400&h=300&fit=crop';
        }

        for ($productId = 51; $productId <= 100; $productId++) {
            $offset = (($productId - 51) * 4) % count($cnttGalleryImages);
            for ($i = 0; $i < 4; $i++) {
                $imageUrl = $cnttGalleryImages[($offset + $i) % count($cnttGalleryImages)];
                $rows[] = [
                    'product_image_id' => $imageId++,
                    'product_id' => $productId,
                    'image_url' => $imageUrl,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // MMT: Product ID 101 → 150
        $mmtGalleryImages = [
            'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/2588757/pexels-photo-2588757.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/2588753/pexels-photo-2588753.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/2588758/pexels-photo-2588758.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/2588759/pexels-photo-2588759.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/2588760/pexels-photo-2588760.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/2588761/pexels-photo-2588761.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/2588762/pexels-photo-2588762.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/2588763/pexels-photo-2588763.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/2588764/pexels-photo-2588764.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/2588765/pexels-photo-2588765.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/2588766/pexels-photo-2588766.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/2588767/pexels-photo-2588767.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/2588768/pexels-photo-2588768.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/2588769/pexels-photo-2588769.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/2588770/pexels-photo-2588770.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/2588771/pexels-photo-2588771.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/2588772/pexels-photo-2588772.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/2588773/pexels-photo-2588773.jpeg?w=400&h=300&fit=crop',
        ];

        for ($j = 0; $j < 180; $j++) {
            $mmtGalleryImages[] = 'https://images.pexels.com/photos/258877' . ($j % 10) . '/pexels-photo-258877' . ($j % 10) . '.jpeg?w=400&h=300&fit=crop';
        }

        for ($productId = 101; $productId <= 150; $productId++) {
            $offset = (($productId - 101) * 4) % count($mmtGalleryImages);
            for ($i = 0; $i < 4; $i++) {
                $imageUrl = $mmtGalleryImages[($offset + $i) % count($mmtGalleryImages)];
                $rows[] = [
                    'product_image_id' => $imageId++,
                    'product_id' => $productId,
                    'image_url' => $imageUrl,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // Graphic: Product ID 151 → 200
        $graphicGalleryImages = [
            'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/265697/pexels-photo-265697.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/265705/pexels-photo-265705.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/265702/pexels-photo-265702.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/265703/pexels-photo-265703.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/265704/pexels-photo-265704.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/265706/pexels-photo-265706.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/265707/pexels-photo-265707.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/265708/pexels-photo-265708.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/265709/pexels-photo-265709.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/265710/pexels-photo-265710.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/265711/pexels-photo-265711.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/265712/pexels-photo-265712.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/265713/pexels-photo-265713.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/265714/pexels-photo-265714.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/265715/pexels-photo-265715.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/265716/pexels-photo-265716.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/265717/pexels-photo-265717.jpeg?w=400&h=300&fit=crop',
            'https://images.pexels.com/photos/265718/pexels-photo-265718.jpeg?w=400&h=300&fit=crop',
        ];

        for ($j = 0; $j < 180; $j++) {
            $graphicGalleryImages[] = 'https://images.pexels.com/photos/26571' . ($j % 10) . '/pexels-photo-26571' . ($j % 10) . '.jpeg?w=400&h=300&fit=crop';
        }

        for ($productId = 151; $productId <= 200; $productId++) {
            $offset = (($productId - 151) * 4) % count($graphicGalleryImages);
            for ($i = 0; $i < 4; $i++) {
                $imageUrl = $graphicGalleryImages[($offset + $i) % count($graphicGalleryImages)];
                $rows[] = [
                    'product_image_id' => $imageId++,
                    'product_id' => $productId,
                    'image_url' => $imageUrl,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        DB::table('product_images')->insert($rows);
        $this->command->info('✅ Đã insert ' . count($rows) . ' ảnh gallery cho 200 sản phẩm!');
    }
}

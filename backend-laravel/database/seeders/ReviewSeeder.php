<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        // COMMIT 1
        Schema::disableForeignKeyConstraints();
        DB::table('reviews')->delete();
        Schema::enableForeignKeyConstraints();

        // COMMIT 2
        $products = DB::table('products')->pluck('product_id')->toArray();
        $teachers = DB::table('users')->pluck('user_id')->toArray();

        // COMMIT 3
        if (empty($products) || empty($teachers)) return;

        $rows = [];

        foreach ($products as $productId) {

            $reviewCount = 1;
            // $reviewCount = rand(2, 4);
            $usedTeachers = [];

            for ($i = 0; $i < $reviewCount; $i++) {

                // COMMIT 4
                do {
                    $teacherId = $teachers[array_rand($teachers)];
                } while (
                    in_array($teacherId, $usedTeachers)
                    && count($usedTeachers) < count($teachers)
                );

                $usedTeachers[] = $teacherId;

                // COMMIT 5
                $rows[] = [
                    'product_id' => $productId,
                    'teacher_id' => $teacherId,
                    'comment' => $this->fakeComment(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // COMMIT 6
        foreach (array_chunk($rows, 500) as $chunk) {
            DB::table('reviews')->insert($chunk);
        }

        DB::table('reviews')->insert($rows);
        $this->command->info('✅ Đã insert ' . count($rows) . ' đánh giá cho 200 sản phẩm!');
    }

    private function fakeComment(): string
    {
        return collect([
            'Sản phẩm có tính ứng dụng cao',
            'Code rõ ràng, dễ hiểu',
            'Giải pháp khá tốt',
            'Giao diện đẹp và logic ổn',
            'Đồ án chất lượng tốt',
            'Có thể phát triển thêm'
        ])->random();
    }
}

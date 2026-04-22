<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Major;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::insert([
            [
                'category_name' => 'Đồ án tốt nghiệp',
                'description' => 'Các sản phẩm đồ án tốt nghiệp.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_name' => 'Nghiên cứu khoa học',
                'description' => 'Các đề tài nghiên cứu ứng dụng và học thuật.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_name' => 'Thực tập doanh nghiệp',
                'description' => 'Sản phẩm thực hiện trong quá trình thực tập.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_name' => 'Ứng dụng thực tế',
                'description' => 'Các sản phẩm có khả năng triển khai thực tế.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_name' => 'Thiết kế sáng tạo',
                'description' => 'Các sản phẩm sáng tạo thuộc lĩnh vực thiết kế.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

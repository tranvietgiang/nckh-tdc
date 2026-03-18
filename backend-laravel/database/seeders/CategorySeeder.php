<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'category_name' => 'Đồ án tốt nghiệp',
                'description' => 'Các sản phẩm đồ án tốt nghiệp',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_name' => 'Đồ án môn học',
                'description' => 'Các sản phẩm đồ án môn học',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_name' => 'Sản phẩm cá nhân',
                'description' => 'Các sản phẩm cá nhân',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_name' => 'Đồ án cá nhân',
                'description' => 'Các đồ án cá nhân',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

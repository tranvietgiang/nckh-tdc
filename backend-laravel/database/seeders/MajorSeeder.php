<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Major;

class MajorSeeder extends Seeder
{
    public function run(): void
    {
        Major::insert([
            [
                'major_code' => 'AI',
                'major_name' => 'Artificial Intelligence',
                'description' => 'Ngành trí tuệ nhân tạo và học máy.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'major_code' => 'CNTT',
                'major_name' => 'Công nghệ thông tin',
                'description' => 'Ngành phát triển phần mềm, website, hệ thống thông tin.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'major_code' => 'MMT',
                'major_name' => 'Mạng máy tính',
                'description' => 'Ngành quản trị mạng, an ninh mạng và hạ tầng hệ thống.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'major_code' => 'TKDH',
                'major_name' => 'Thiết kế đồ họa',
                'description' => 'Ngành thiết kế hình ảnh, thương hiệu và giao diện số.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

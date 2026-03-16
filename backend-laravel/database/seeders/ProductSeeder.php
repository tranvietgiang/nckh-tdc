<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'product_name' => 'App Quản Lý Công Việc - TaskFlow',
                'description' => 'Ứng dụng quản lý công việc theo phương pháp Kanban, hỗ trợ team làm việc hiệu quả.',
                'thumbnail' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
                'cate_id' => 1,
                'status' => 'approved',
                'submitted_at' => '2024-02-01',
                'views' => 1234,
                'likes' => 89,
                'feedback' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_name' => 'Website Thương Mại Điện Tử - TechStore',
                'description' => 'Website bán đồ công nghệ với giỏ hàng, thanh toán online và quản lý đơn hàng.',
                'thumbnail' => 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400',
                'cate_id' => 2,
                'status' => 'approved',
                'submitted_at' => '2024-01-15',
                'views' => 2341,
                'likes' => 156,
                'feedback' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_name' => 'App Học Tiếng Anh - EasyEnglish',
                'description' => 'App học tiếng Anh với AI, đề xuất lộ trình học cá nhân hóa.',
                'thumbnail' => 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400',
                'cate_id' => 3,
                'status' => 'pending',
                'submitted_at' => '2024-03-10',
                'views' => 0,
                'likes' => 0,
                'feedback' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_name' => 'Game Flappy Bird - Bản Clone',
                'description' => 'Game Flappy Bird được viết lại bằng Python với Pygame.',
                'thumbnail' => 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400',
                'cate_id' => 4,
                'status' => 'rejected',
                'submitted_at' => '2024-02-20',
                'views' => 0,
                'likes' => 0,
                'feedback' => 'Cần bổ sung tài liệu hướng dẫn chi tiết hơn và video demo sản phẩm.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

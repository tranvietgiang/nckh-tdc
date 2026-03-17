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
                'product_id' => 1,
                'title' => 'App Quản Lý Công Việc - TaskFlow',
                'description' => 'Ứng dụng quản lý công việc theo phương pháp Kanban, hỗ trợ team làm việc hiệu quả.',
                'thumbnail' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
                'github_link' => 'https://github.com/student1/taskflow',
                'demo_link' => 'https://taskflow-demo.vercel.app',
                'status' => 'approved',
                'user_id' => '23211TT2984',
                'major_id' => 1,
                'cate_id' => 1,
                'approved_by' => 'GV001',
                'submitted_at' => '2024-02-01 08:00:00',
                'approved_at' => '2024-02-03 10:30:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 2,
                'title' => 'Website Thương Mại Điện Tử - TechStore',
                'description' => 'Website bán đồ công nghệ với giỏ hàng, thanh toán online và quản lý đơn hàng.',
                'thumbnail' => 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400',
                'github_link' => 'https://github.com/student2/techstore',
                'demo_link' => 'https://techstore-demo.vercel.app',
                'status' => 'approved',
                'user_id' => '23211TT2984',
                'major_id' => 1,
                'cate_id' => 2,
                'approved_by' => 'GV001',
                'submitted_at' => '2024-01-15 09:00:00',
                'approved_at' => '2024-01-18 14:00:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 3,
                'title' => 'App Học Tiếng Anh - EasyEnglish',
                'description' => 'App học tiếng Anh với AI, đề xuất lộ trình học cá nhân hóa.',
                'thumbnail' => 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400',
                'github_link' => 'https://github.com/student3/easyenglish',
                'demo_link' => 'https://easyenglish-demo.vercel.app',
                'status' => 'pending',
                'user_id' => '23211TT2984',
                'major_id' => 2,
                'cate_id' => 3,
                'approved_by' => 'GV001',
                'submitted_at' => '2024-03-10 13:20:00',
                'approved_at' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 4,
                'title' => 'Game Flappy Bird - Bản Clone',
                'description' => 'Game Flappy Bird được viết lại bằng Python với Pygame.',
                'thumbnail' => 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400',
                'github_link' => 'https://github.com/student4/flappybird-clone',
                'demo_link' => 'https://flappybird-demo.vercel.app',
                'status' => 'rejected',
                'user_id' => '23211TT2984',
                'major_id' => 3,
                'cate_id' => 4,
                'approved_by' => 'GV001',
                'submitted_at' => '2024-02-20 15:45:00',
                'approved_at' => '2024-02-22 11:00:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

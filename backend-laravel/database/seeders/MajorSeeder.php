<?php

namespace Database\Seeders;

use App\Models\Major;
use Illuminate\Database\Seeder;

class MajorSeeder extends Seeder
{
    public function run(): void
    {
        Major::create([
            'major_name' => 'Công nghệ thông tin',
            'description' => 'Ngành đào tạo về lập trình, hệ thống thông tin, mạng máy tính và phần mềm.'
        ]);

        Major::create([
            'major_name' => 'Kỹ thuật phần mềm',
            'description' => 'Ngành tập trung vào phân tích, thiết kế, phát triển và kiểm thử phần mềm.'
        ]);

        Major::create([
            'major_name' => 'Hệ thống thông tin',
            'description' => 'Ngành đào tạo về quản lý, phân tích và xây dựng hệ thống thông tin cho doanh nghiệp.'
        ]);

        Major::create([
            'major_name' => 'Mạng máy tính và truyền thông dữ liệu',
            'description' => 'Ngành đào tạo về quản trị mạng, bảo mật, hạ tầng và truyền thông dữ liệu.'
        ]);
    }
}

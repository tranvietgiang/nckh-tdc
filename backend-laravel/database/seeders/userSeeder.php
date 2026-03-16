<?php

namespace Database\Seeders;

use App\Models\Major;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class userSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Student
        DB::table('users')->insert([
            [
                'user_id' => '23211TT2984',
                'name' => 'Nguyễn Văn An',
                'email' => 'an2984@student.tdc.edu.vn',
                'password' => Hash::make('12345678'),
                'role' => 'student',
                'major_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => '23211TT1234',
                'name' => 'Trần Thị Bình',
                'email' => 'binh1234@student.tdc.edu.vn',
                'password' => Hash::make('12345678'),
                'role' => 'student',
                'major_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => '23211TT5678',
                'name' => 'Lê Hoàng Cường',
                'email' => 'cuong5678@student.tdc.edu.vn',
                'password' => Hash::make('12345678'),
                'role' => 'student',
                'major_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => '23211TT8999',
                'name' => 'Phạm Minh Duy',
                'email' => 'duy8999@student.tdc.edu.vn',
                'password' => Hash::make('12345678'),
                'role' => 'student',
                'major_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        User::create([
            'user_id' => 'GV001',
            'name' => 'Tran Van B',
            'email' => 'teacher@test.com',
            'password' => Hash::make('12345678'),
            'role' => 'teacher',
            'major_id' => 1
        ]);

        User::create([
            'user_id' => 'ADMIN01',
            'name' => 'Admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('12345678'),
            'role' => 'admin',
            'major_id' => null
        ]);
    }
}

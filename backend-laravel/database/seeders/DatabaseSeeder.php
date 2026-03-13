<?php

namespace Database\Seeders;

use App\Models\Major;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // Tạo ngành
        Major::create([
            'major_name' => 'Công nghệ thông tin',
            'description' => 'demo'
        ]);

        // Student
        User::create([
            'user_id' => '23211TT2984',
            'name' => 'Nguyen Van A',
            'email' => 'student@test.com',
            'password' => Hash::make('12345678'),
            'role' => 'student',
            'major_id' => 1
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

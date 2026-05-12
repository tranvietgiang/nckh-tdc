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
                'user_id' => '23211TT1111',
                'name' => 'Trần Thị Bình',
                'email' => 'binh1111@student.tdc.edu.vn',
                'password' => Hash::make('12345678'),
                'role' => 'student',
                'major_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => '23211TT2222',
                'name' => 'Lê Hoàng Cường',
                'email' => 'cuong2222@student.tdc.edu.vn',
                'password' => Hash::make('12345678'),
                'role' => 'student',
                'major_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => '23211TT3333',
                'name' => 'Phạm Minh Duy',
                'email' => 'duy3333@student.tdc.edu.vn',
                'password' => Hash::make('12345678'),
                'role' => 'student',
                'major_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        DB::table('users')->insert([
            [
                'user_id' => 'GV001',
                'name' => 'Trần Văn B',
                'email' => 'teacher@test.com',
                'password' => Hash::make('12345678'),
                'role' => 'teacher',
                'major_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 'GV002',
                'name' => 'Lê Thị C',
                'email' => 'teacher2@test.com',
                'password' => Hash::make('12345678'),
                'role' => 'teacher',
                'major_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 'GV003',
                'name' => 'Phạm Văn D',
                'email' => 'teacher3@test.com',
                'password' => Hash::make('12345678'),
                'role' => 'teacher',
                'major_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 'GV004',
                'name' => 'Nguyễn Thị E',
                'email' => 'teacher4@test.com',
                'password' => Hash::make('12345678'),
                'role' => 'teacher',
                'major_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // ADMIN
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

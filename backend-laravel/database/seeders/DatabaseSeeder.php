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
        // User::factory(10)->create();

        Major::create([
            'major_name' => 'Công nghệ thông tin',
            'description' => 'demo'
        ]);

        User::create([
            'user_id' => '23211TT2984',
            'name' => 'Nguyen Van A',
            'email' => 'student@test.com',
            'password' => Hash::make('12345678'),
            'role' => 'student',
            'major_id' => 1
        ]);
    }
}

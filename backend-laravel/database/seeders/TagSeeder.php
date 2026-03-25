<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('tags')->insert([
            [
                'tag_id' => 1,
                'tag_name' => 'React',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tag_id' => 2,
                'tag_name' => 'Node.js',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tag_id' => 3,
                'tag_name' => 'MongoDB',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tag_id' => 4,
                'tag_name' => 'TailwindCSS',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tag_id' => 5,
                'tag_name' => 'Laravel',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tag_id' => 6,
                'tag_name' => 'MySQL',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tag_id' => 7,
                'tag_name' => 'Python',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tag_id' => 8,
                'tag_name' => 'Pygame',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tag_id' => 9,
                'tag_name' => 'AI',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductFileSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('product_files')->truncate();

        $rows = [];
        $fileId = 1;

        $products = DB::table('products as p')
            ->join('majors as m', 'p.major_id', '=', 'm.major_id')
            ->select('p.product_id', 'm.major_name')
            ->get();

        foreach ($products as $p) {

            $major = strtolower(trim($p->major_name ?? ''));

            // ================= DETECT MAJOR (GIỐNG FRONTEND) =================
            $isAI = $major === 'ai'
                || str_contains($major, 'artificial intelligence')
                || str_contains($major, 'trí tuệ nhân tạo');

            $isCNTT = $major === 'cntt'
                || str_contains($major, 'công nghệ thông tin')
                || str_contains($major, 'information technology');

            $isMMT = $major === 'mmt'
                || str_contains($major, 'mạng máy tính')
                || str_contains($major, 'network');

            $isGRAPHIC = $major === 'tkdh'
                || str_contains($major, 'thiết kế đồ họa')
                || str_contains($major, 'graphic');

            // ================= PATH BASE =================
            $base = match (true) {
                $isAI => 'ai',
                $isCNTT => 'cntt',
                $isMMT => 'mmt',
                $isGRAPHIC => 'graphic',
                default => 'other'
            };

            // ================= FILE TEMPLATE =================
            $files = [];

            if ($isAI) {
                $files = [
                    ['report.pdf', 'pdf'],
                    ['model.zip', 'zip'],
                    ['demo.pptx', 'pptx'],
                ];
            }

            if ($isCNTT) {
                $files = [
                    ['report.pdf', 'pdf'],
                    ['source.zip', 'zip'],
                    ['slide.pptx', 'pptx'],
                ];
            }

            if ($isMMT) {
                $files = [
                    ['report.pdf', 'pdf'],
                    ['config.zip', 'zip'],
                    ['topology.pkt', 'pkt'],
                ];
            }

            if ($isGRAPHIC) {
                $files = [
                    ['report.pdf', 'pdf'],
                    ['source.psd', 'psd'],
                    ['mockup.ai', 'ai'],
                ];
            }

            // ================= INSERT FILES =================
            foreach ($files as $f) {
                $rows[] = [
                    'product_file_id' => $fileId++,
                    'product_id' => $p->product_id,
                    'file_url' => "/storage/products/$base/product_{$p->product_id}/{$f[0]}",
                    'file_type' => $f[1],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        DB::table('product_files')->insert($rows);
    }
}

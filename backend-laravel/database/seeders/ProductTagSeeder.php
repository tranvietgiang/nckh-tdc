<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductTagSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('product_tags')->truncate();

        $rows = [];

        $products = DB::table('products as p')
            ->join('majors as m', 'p.major_id', '=', 'm.major_id')
            ->select('p.product_id', 'm.major_name')
            ->get();

        foreach ($products as $p) {

            $major = strtolower(trim($p->major_name ?? ''));

            // ================= JS STYLE DETECT =================
            $isAI = $major === 'ai'
                || str_contains($major, 'artificial intelligence')
                || str_contains($major, 'trí tuệ nhân tạo');

            $isCNTT = $major === 'cntt'
                || str_contains($major, 'công nghệ thông tin')
                || str_contains($major, 'information technology');

            $isMMT = $major === 'mmt'
                || str_contains($major, 'mạng máy tính')
                || str_contains($major, 'network');

            $isTKDH = $major === 'tkdh'
                || str_contains($major, 'thiết kế đồ họa')
                || str_contains($major, 'graphic');

            // ================= SELECT POOL =================
            $pool = [];

            if ($isAI) {
                $pool = $this->aiTags();
            } elseif ($isCNTT) {
                $pool = $this->cnttTags();
            } elseif ($isMMT) {
                $pool = $this->mmtTags();
            } elseif ($isTKDH) {
                $pool = $this->graphicTags();
            }

            // ================= GENERATE TAGS =================
            $tags = collect($pool)
                ->shuffle()
                ->take(5);

            foreach ($tags as $tag) {
                $rows[] = [
                    'product_id' => $p->product_id,
                    'tag_name' => $tag,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        DB::table('product_tags')->insert($rows);
    }

    /* ================= POOLS ================= */

    private function aiTags()
    {
        return [
            'Computer Vision',
            'NLP',
            'Deep Learning',
            'AI Model',
            'Detection',
            'Chatbot',
            'Recommendation',
            'Prediction',
            'Automation',
            'Dataset'
        ];
    }

    private function cnttTags()
    {
        return [
            'API',
            'System',
            'Management',
            'Database',
            'Backend',
            'Dashboard',
            'Web App',
            'Authentication',
            'Realtime',
            'Ecommerce'
        ];
    }

    private function mmtTags()
    {
        return [
            'Network',
            'Security',
            'Routing',
            'Infrastructure',
            'Server',
            'Topology',
            'Monitoring',
            'Firewall',
            'LAN',
            'VPN'
        ];
    }

    private function graphicTags()
    {
        return [
            'UI Design',
            'UX',
            'Branding',
            'Creative',
            'Poster',
            'Logo',
            'Typography',
            'Marketing',
            'Banner',
            'Social Media'
        ];
    }
}

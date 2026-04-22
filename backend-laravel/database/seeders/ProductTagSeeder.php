<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductTagSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [];

        /*
        |--------------------------------------------------------------------------
        | AI (1 -> 10)
        |--------------------------------------------------------------------------
        */

        $aiTags = [
            1  => ['AI', 'CNN', 'Python'],
            2  => ['YOLO', 'OCR', 'Computer Vision'],
            3  => ['Chatbot', 'NLP', 'GPT'],
            4  => ['Machine Learning', 'Prediction', 'Python'],
            5  => ['ResNet', 'Image Classification', 'PyTorch'],
            6  => ['Emotion AI', 'Deep Learning', 'TensorFlow'],
            7  => ['Translation', 'Transformer', 'NLP'],
            8  => ['MNIST', 'Handwriting', 'CNN'],
            9  => ['Recommendation', 'AI', 'Data Mining'],
            10 => ['Mask Detection', 'YOLO', 'OpenCV'],
        ];

        /*
        |--------------------------------------------------------------------------
        | CNTT (11 -> 20)
        |--------------------------------------------------------------------------
        */

        $cnttTags = [
            11 => ['Laravel', 'MySQL', 'Website'],
            12 => ['React', 'NodeJS', 'API'],
            13 => ['PHP', 'Backend', 'Management'],
            14 => ['Java', 'Spring Boot', 'System'],
            15 => ['VueJS', 'Firebase', 'App'],
            16 => ['Socket.IO', 'Realtime', 'Chat'],
            17 => ['C#', '.NET', 'Desktop'],
            18 => ['RESTful API', 'Laravel', 'Backend'],
            19 => ['JavaScript', 'CRUD', 'Dashboard'],
            20 => ['Ecommerce', 'PHP', 'MySQL'],
        ];

        /*
        |--------------------------------------------------------------------------
        | MMT (21 -> 30)
        |--------------------------------------------------------------------------
        */

        $mmtTags = [
            21 => ['Cisco', 'VLAN', 'Network'],
            22 => ['OSPF', 'Routing', 'Packet Tracer'],
            23 => ['Firewall', 'Security', 'ACL'],
            24 => ['DHCP', 'LAN', 'Switch'],
            25 => ['GNS3', 'Router', 'Topology'],
            26 => ['VPN', 'Security', 'Network'],
            27 => ['Server', 'Linux', 'Infrastructure'],
            28 => ['WiFi', 'Access Point', 'Wireless'],
            29 => ['Subnetting', 'IP Address', 'Network'],
            30 => ['Monitoring', 'Zabbix', 'System'],
        ];

        /*
        |--------------------------------------------------------------------------
        | Graphic (31 -> 40)
        |--------------------------------------------------------------------------
        */

        $graphicTags = [
            31 => ['Logo', 'Illustrator', 'Branding'],
            32 => ['Poster', 'Photoshop', 'Creative'],
            33 => ['UIUX', 'Figma', 'Design'],
            34 => ['Banner', 'Marketing', 'Adobe'],
            35 => ['Packaging', 'Product Design', 'Illustrator'],
            36 => ['Landing Page', 'UI', 'Figma'],
            37 => ['Typography', 'Creative', 'Design'],
            38 => ['Brand Identity', 'Logo', 'Photoshop'],
            39 => ['Mobile UI', 'Prototype', 'Figma'],
            40 => ['Social Media', 'Banner', 'Photoshop'],
        ];

        $allTags = $aiTags + $cnttTags + $mmtTags + $graphicTags;

        foreach ($allTags as $productId => $tags) {
            foreach ($tags as $tag) {
                $rows[] = [
                    'product_id' => $productId,
                    'tag_name' => $tag,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        DB::table('product_tags')->insert($rows);
    }
}

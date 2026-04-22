<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductAi;
use App\Models\ProductCNTT;
use App\Models\ProductMMT;
use App\Models\ProductGraphic;
use App\Models\User;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedAI();
        $this->seedCNTT();
        $this->seedMMT();
        $this->seedGraphic();
    }

    /*
    |--------------------------------------------------------------------------
    | AI - 10 sản phẩm
    |--------------------------------------------------------------------------
    */

    private function seedAI()
    {
        $items = [
            [
                'title' => 'Hệ thống nhận diện khuôn mặt sinh viên bằng CNN',
                'description' => 'Ứng dụng điểm danh tự động bằng camera sử dụng mạng CNN.',
                'model_used' => 'CNN',
                'framework' => 'TensorFlow',
                'language' => 'Python',
                'dataset_used' => 'Custom Face Dataset',
                'accuracy_score' => 95.40,
            ],
            [
                'title' => 'Nhận diện biển số xe thông minh',
                'description' => 'Phát hiện và đọc biển số xe thời gian thực.',
                'model_used' => 'YOLOv8 + OCR',
                'framework' => 'PyTorch',
                'language' => 'Python',
                'dataset_used' => 'Vietnam Plate Dataset',
                'accuracy_score' => 93.80,
            ],
            [
                'title' => 'Chatbot tư vấn tuyển sinh',
                'description' => 'Chatbot hỗ trợ giải đáp thông tin tuyển sinh.',
                'model_used' => 'GPT API',
                'framework' => 'OpenAI',
                'language' => 'Python',
                'dataset_used' => 'Training FAQ',
                'accuracy_score' => 92.10,
            ],
            [
                'title' => 'Dự đoán giá nhà bằng Machine Learning',
                'description' => 'Ước lượng giá bất động sản dựa trên dữ liệu thị trường.',
                'model_used' => 'Random Forest',
                'framework' => 'Scikit-learn',
                'language' => 'Python',
                'dataset_used' => 'Housing Dataset',
                'accuracy_score' => 90.50,
            ],
            [
                'title' => 'Phân loại rác thải thông minh',
                'description' => 'Phân loại rác hữu cơ và vô cơ bằng AI.',
                'model_used' => 'ResNet50',
                'framework' => 'PyTorch',
                'language' => 'Python',
                'dataset_used' => 'Garbage Dataset',
                'accuracy_score' => 94.20,
            ],
            [
                'title' => 'Nhận diện cảm xúc khuôn mặt',
                'description' => 'Xác định trạng thái cảm xúc người dùng.',
                'model_used' => 'CNN',
                'framework' => 'TensorFlow',
                'language' => 'Python',
                'dataset_used' => 'FER2013',
                'accuracy_score' => 89.60,
            ],
            [
                'title' => 'Dịch máy Anh - Việt',
                'description' => 'Mô hình dịch ngôn ngữ tự động.',
                'model_used' => 'Transformer',
                'framework' => 'PyTorch',
                'language' => 'Python',
                'dataset_used' => 'Parallel Corpus',
                'accuracy_score' => 91.30,
            ],
            [
                'title' => 'Nhận dạng chữ viết tay',
                'description' => 'Nhận diện chữ số viết tay.',
                'model_used' => 'CNN',
                'framework' => 'TensorFlow',
                'language' => 'Python',
                'dataset_used' => 'MNIST',
                'accuracy_score' => 98.70,
            ],
            [
                'title' => 'Hệ thống gợi ý khóa học',
                'description' => 'Đề xuất môn học phù hợp cho sinh viên.',
                'model_used' => 'Collaborative Filtering',
                'framework' => 'Scikit-learn',
                'language' => 'Python',
                'dataset_used' => 'Student Behavior Data',
                'accuracy_score' => 88.40,
            ],
            [
                'title' => 'Phát hiện khẩu trang nơi công cộng',
                'description' => 'Nhận diện người có đeo khẩu trang.',
                'model_used' => 'YOLOv5',
                'framework' => 'PyTorch',
                'language' => 'Python',
                'dataset_used' => 'Mask Dataset',
                'accuracy_score' => 96.10,
            ],
        ];

        foreach ($items as $item) {
            $product = $this->createProduct($item['title'], $item['description'], 1);

            ProductAi::create([
                'product_id' => $product->product_id,
                'model_used' => $item['model_used'],
                'framework' => $item['framework'],
                'language' => $item['language'],
                'dataset_used' => $item['dataset_used'],
                'accuracy_score' => $item['accuracy_score'],
                'github_link' => 'https://github.com/example/project',
                'demo_link' => 'https://demo.example.com',
            ]);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | CNTT - 10 sản phẩm
    |--------------------------------------------------------------------------
    */

    private function seedCNTT()
    {
        $items = [
            ['Website quản lý thư viện', 'PHP', 'Laravel', 'MySQL'],
            ['Website bán hàng trực tuyến', 'PHP', 'Laravel', 'MySQL'],
            ['Hệ thống quản lý sinh viên', 'JavaScript', 'React + NodeJS', 'MongoDB'],
            ['Ứng dụng đặt lịch khám bệnh', 'PHP', 'Laravel', 'MySQL'],
            ['Website học trực tuyến', 'JavaScript', 'React', 'MySQL'],
            ['Chat realtime sinh viên', 'JavaScript', 'Socket.IO', 'MongoDB'],
            ['Quản lý nhân sự doanh nghiệp', 'C#', '.NET', 'SQL Server'],
            ['API quản lý sản phẩm', 'PHP', 'Laravel API', 'MySQL'],
            ['Ứng dụng ghi chú cá nhân', 'JavaScript', 'VueJS', 'Firebase'],
            ['Website tuyển dụng việc làm', 'PHP', 'Laravel', 'MySQL'],
        ];

        foreach ($items as $item) {
            $product = $this->createProduct($item[0], 'Đề tài thuộc ngành Công nghệ thông tin.', 2);

            ProductCNTT::create([
                'product_id' => $product->product_id,
                'programming_language' => $item[1],
                'framework' => $item[2],
                'database_used' => $item[3],
                'github_link' => 'https://github.com/example/project',
                'demo_link' => 'https://demo.example.com',

            ]);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | MMT - 10 sản phẩm
    |--------------------------------------------------------------------------
    */

    private function seedMMT()
    {
        $items = [
            ['Mô phỏng hệ thống VLAN doanh nghiệp', 'Cisco Packet Tracer', 'VLAN', 'Star'],
            ['Thiết kế mạng trường học', 'Cisco Packet Tracer', 'DHCP', 'Tree'],
            ['Mạng nội bộ công ty nhỏ', 'GNS3', 'OSPF', 'Mesh'],
            ['Hệ thống định tuyến đa chi nhánh', 'GNS3', 'RIP', 'Hybrid'],
            ['Mô hình mạng khách sạn', 'Cisco Packet Tracer', 'VLAN', 'Star'],
            ['Triển khai Firewall cơ bản', 'Packet Tracer', 'ACL', 'Tree'],
            ['Hệ thống camera IP nội bộ', 'GNS3', 'Static Route', 'Star'],
            ['Mạng bệnh viện thông minh', 'Cisco Packet Tracer', 'OSPF', 'Hybrid'],
            ['Mạng thư viện điện tử', 'Packet Tracer', 'DHCP', 'Star'],
            ['Mạng ký túc xá sinh viên', 'GNS3', 'VLAN', 'Mesh'],
        ];

        foreach ($items as $item) {
            $product = $this->createProduct($item[0], 'Đề tài thuộc ngành Mạng máy tính.', 3);

            ProductMMT::create([
                'product_id' => $product->product_id,
                'simulation_tool' => $item[1],
                'network_protocol' => $item[2],
                'topology_type' => $item[3],
                'config_file' => 'configs/sample.txt',
                'demo_link' => 'https://demo.example.com',
            ]);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Graphic - 10 sản phẩm
    |--------------------------------------------------------------------------
    */

    private function seedGraphic()
    {
        $items = [
            ['Thiết kế logo thương hiệu cà phê', 'Logo', 'Adobe Illustrator', 'https://drive.google.com/logo1'],
            ['Poster tuyên truyền môi trường', 'Poster', 'Adobe Photoshop', 'https://drive.google.com/poster1'],
            ['UI ứng dụng học tập', 'UIUX', 'Figma', 'https://drive.google.com/ui1'],
            ['Banner khuyến mãi mùa hè', 'Banner', 'Photoshop', 'https://drive.google.com/banner1'],
            ['Bộ nhận diện thương hiệu spa', 'Branding', 'Illustrator', 'https://drive.google.com/brand1'],
            ['Thiết kế giao diện website trường học', 'UIUX', 'Figma', 'https://drive.google.com/ui2'],
            ['Bao bì sản phẩm nước giải khát', 'Packaging', 'Illustrator', 'https://drive.google.com/package1'],
            ['Poster tuyển sinh đại học', 'Poster', 'Photoshop', 'https://drive.google.com/poster2'],
            ['Thiết kế menu nhà hàng', 'Print Design', 'CorelDRAW', 'https://drive.google.com/menu1'],
            ['Landing page giới thiệu sản phẩm', 'UIUX', 'Figma', 'https://drive.google.com/landing1'],
        ];

        foreach ($items as $item) {
            $product = $this->createProduct(
                $item[0],
                'Đề tài thuộc ngành Thiết kế đồ họa.',
                4
            );

            ProductGraphic::create([
                'product_id'   => $product->product_id,
                'design_type' => $item[1],
                'tools_used'  => $item[2],
                'demo_link' => $item[3],
                'behance_link' => 'https://www.behance.net/example',
            ]);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Product chung
    |--------------------------------------------------------------------------
    */

    private function createProduct($title, $description, $majorId)
    {
        $user = User::first();

        return Product::create([
            'title' => $title,
            'description' => $description,
            'thumbnail' => 'uploads/default.jpg',
            'status' => 'approved',
            'user_id' => $user->user_id,
            'major_id' => $majorId,
            'cate_id' => 1,
            'approved_by' => $user->user_id,
            'approved_at' => now(),
        ]);
    }
}

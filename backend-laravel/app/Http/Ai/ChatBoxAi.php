<?php

namespace App\Http\Ai;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use App\Http\Common\NormalizeMajorCode;

class ChatBoxAi
{
    public function __construct(protected NormalizeMajorCode $normalizeMajorCode) {}

    private function isRelevantQuestion(string $message): bool
    {
        $msg = mb_strtolower($message, 'UTF-8');

        $keywords = [
            // Đồ án / sản phẩm
            'đồ án',
            'sản phẩm',
            'tài liệu',
            'project',
            'bài làm',
            'upload',
            'tải lên',
            'nộp',

            // Ngành học
            'ngành',
            'major',
            'cntt',
            'ai',
            'mmt',
            'graphic',
            'công nghệ',
            'thông tin',
            'trí tuệ nhân tạo',
            'mạng máy tính',
            'thiết kế',

            // Danh mục
            'danh mục',
            'category',
            'loại',

            // Thống kê
            'thống kê',
            'bao nhiêu',
            'tổng',
            'số lượng',
            'xem nhiều',
            'lượt xem',
            'lượt thích',
            'like',
            'view',
            'top',
            'nổi bật',
            'phổ biến',

            // Người dùng
            'người dùng',
            'tài khoản',
            'giảng viên',
            'sinh viên',
            'teacher',
            'student',
            'user',

            // Review
            'đánh giá',
            'nhận xét',
            'review',
            'comment',

            // Tìm kiếm
            'tìm',
            'search',
            'danh sách',
            'liệt kê',
            'cho tôi biết',
            'hiển thị',
            'show',

            // Tags
            'tag',
            'nhãn',
            'từ khóa',

            // Kỹ thuật (chuyên ngành)
            'framework',
            'language',
            'model',
            'dataset',
            'accuracy',
            'database',
            'network',
            'topology',
            'protocol',
            'design',
            'behance',
            'github',
            'demo',

            // Hệ thống chung
            'hệ thống',
            'website',
            'ứng dụng',
            'app',
            'hoạt động',
            'log',
            'lịch sử',
        ];

        foreach ($keywords as $keyword) {
            if (str_contains($msg, $keyword)) {
                return true;
            }
        }

        return false;
    }

    public function chat(Request $request)
    {
        $user    = $request->user();
        $role    = $user->role    ?? 'guest';
        $majorId = $user->major_id ?? null;

        /* ── 1. PARSE MESSAGE ─────────────────────────────────────── */
        $message = $request->input('message');

        if (is_array($message)) {
            $message = $message['text'] ?? implode(' ', $message);
        }
        if (is_object($message)) {
            $message = json_encode($message, JSON_UNESCAPED_UNICODE);
        }

        $message = trim((string) $message);

        if ($message === '') {
            return response()->json(['reply' => 'Vui lòng nhập câu hỏi.'], 422);
        }

        if (!$this->isRelevantQuestion($message)) {
            $replies = [
                'Xin lỗi, mình chỉ hỗ trợ các câu hỏi liên quan đến hệ thống quản lý đồ án. Bạn có thể hỏi về sản phẩm, ngành học, danh mục, thống kê, v.v.',
                'Câu hỏi này nằm ngoài phạm vi hỗ trợ của mình rồi 😅',
                'Chào bạn! Tôi có thể giúp gì cho bạn hôm nay? Bạn quan tâm đến đồ án hay tài liệu học thuật nào không?',
                'Xin chào! Mình là trợ lý hệ thống đồ án. Bạn cần tìm kiếm tài liệu hay xem thống kê gì không?',
                'Hi bạn! Hỏi mình về đồ án, ngành học, hay thống kê hệ thống đi nhé 😊',
            ];

            return response()->json([
                'reply' => $replies[array_rand($replies)]
            ]);
        }

        /* ── 2. OVERRIDE MAJOR TỪ TEXT ────────────────────────────── */
        $majorCode = $this->normalizeMajorCode->normalizeMajorCode($message);
        if ($majorCode) {
            $majorId = DB::table('majors')
                ->where('major_code', $majorCode)
                ->value('major_id');
        }

        /* ── 3. BUILD CONTEXT THEO ROLE ───────────────────────────── */
        $data = match (true) {
            $role === 'admin'                          => $this->buildAdminContext(),
            in_array($role, ['teacher', 'student'])   => $this->buildMajorContext($majorId, $role),
            default                                    => $this->buildGuestContext(),
        };

        if (isset($data['__error'])) {
            return response()->json(['reply' => $data['__error']], 403);
        }

        /* ── 4. CALL OPENAI ───────────────────────────────────────── */
        $systemPrompt = $this->buildSystemPrompt($role, $data);

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
            'Content-Type'  => 'application/json',
        ])->timeout(30)->post('https://api.openai.com/v1/responses', [
            'model' => 'gpt-4.1-mini',
            'input' => [
                [
                    'role'    => 'system',
                    'content' => [[
                        'type' => 'input_text',
                        'text' => $systemPrompt,
                    ]],
                ],
                [
                    'role'    => 'user',
                    'content' => [[
                        'type' => 'input_text',
                        'text' => $message,
                    ]],
                ],
            ],
        ]);

        /* ── 5. PARSE RESPONSE ────────────────────────────────────── */
        if ($response->failed()) {
            return response()->json([
                'reply' => 'Không thể kết nối AI lúc này, vui lòng thử lại.',
            ], 502);
        }

        $result = $response->json();
        $reply  = data_get($result, 'output.0.content.0.text')
            ?? data_get($result, 'output_text')
            ?? 'AI không trả về dữ liệu.';

        return response()->json(['reply' => $reply]);
    }

    /* ════════════════════════════════════════════════════════════════
     *  CONTEXT BUILDERS
     * ════════════════════════════════════════════════════════════════ */

    private function buildAdminContext(): array
    {
        /* Thống kê tổng quan */
        $overview = [
            'total_products'   => DB::table('products')->count(),
            'total_categories' => DB::table('categories')->count(),
            'total_majors'     => DB::table('majors')->count(),
            'total_users'      => DB::table('users')->count(),
            'total_reviews'    => DB::table('reviews')->count(),
            'total_files'      => DB::table('product_files')->count(),
            'total_images'     => DB::table('product_images')->count(),
        ];

        /* Sản phẩm theo ngành — dùng major_name (đúng theo model) */
        $productsByMajor = DB::table('products')
            ->join('majors', 'products.major_id', '=', 'majors.major_id')
            ->selectRaw('majors.major_name, majors.major_code, COUNT(*) as total')
            ->groupBy('majors.major_id', 'majors.major_name', 'majors.major_code')
            ->orderByDesc('total')
            ->get();

        /* Top 10 sản phẩm được xem nhiều nhất — dùng views (đúng theo model) */
        $topViewedProducts = DB::table('product_statistics')
            ->join('products', 'product_statistics.product_id', '=', 'products.product_id')
            ->select(
                'products.product_id',
                'products.title',
                'product_statistics.views',
                'product_statistics.likes'
            )
            ->orderByDesc('product_statistics.views')
            ->limit(10)
            ->get();

        /* Đánh giá (reviews chỉ có comment, không có rating theo model) */
        $recentReviewsAll = DB::table('reviews')
            ->join('products', 'reviews.product_id', '=', 'products.product_id')
            ->join('users', 'reviews.teacher_id', '=', 'users.id')
            ->select(
                'products.title as product_title',
                'users.name as teacher_name',
                'reviews.comment',
                'reviews.created_at'
            )
            ->latest('reviews.created_at')
            ->limit(10)
            ->get();

        /* Thống kê theo ngành: views + likes tổng */
        $statsByMajor = DB::table('product_statistics')
            ->join('products', 'product_statistics.product_id', '=', 'products.product_id')
            ->join('majors', 'products.major_id', '=', 'majors.major_id')
            ->selectRaw('majors.major_name, SUM(product_statistics.views) as total_views, SUM(product_statistics.likes) as total_likes')
            ->groupBy('majors.major_id', 'majors.major_name')
            ->orderByDesc('total_views')
            ->get();

        /* Tags phổ biến — dùng tag_name (đúng theo model) */
        $popularTags = DB::table('product_tags')
            ->selectRaw('tag_name, COUNT(*) as total')
            ->groupBy('tag_name')
            ->orderByDesc('total')
            ->limit(15)
            ->get();

        /* Danh mục + số sản phẩm — dùng cate_name, cate_id (đúng theo model) */
        $categoriesWithCount = DB::table('categories')
            ->leftJoin('products', 'categories.cate_id', '=', 'products.cate_id')
            ->selectRaw('categories.category_name, COUNT(products.product_id) as product_count')
            ->groupBy('categories.cate_id', 'categories.category_name')
            ->orderByDesc('product_count')
            ->get();

        /* Sản phẩm theo loại chuyên ngành (AI / CNTT / Graphic / MMT) */
        $specializedCounts = [
            'AI'      => DB::table('product_ai')->count(),
            'CNTT'    => DB::table('product_cntt')->count(),
            'Graphic' => DB::table('product_graphic')->count(),
            'MMT'     => DB::table('product_mmt')->count(),
        ];

        /* Log hoạt động gần nhất */
        $recentActivities = DB::table('activity_logs')
            ->select('user_id', 'action', 'description', 'created_at')
            ->latest('created_at')
            ->limit(10)
            ->get();

        return compact(
            'overview',
            'productsByMajor',
            'topViewedProducts',
            'recentReviewsAll',
            'statsByMajor',
            'popularTags',
            'categoriesWithCount',
            'specializedCounts',
            'recentActivities'
        );
    }

    private function buildMajorContext(?int $majorId, string $role): array
    {
        if (!$majorId) {
            return ['__error' => 'Bạn chưa được gán ngành học.'];
        }

        $major = DB::table('majors')->where('major_id', $majorId)->first();
        if (!$major) {
            return ['__error' => 'Ngành học không tồn tại.'];
        }

        /* Danh sách sản phẩm trong ngành — join categories qua cate_id */
        $products = DB::table('products')
            ->leftJoin('categories', 'products.cate_id', '=', 'categories.cate_id')
            ->where('products.major_id', $majorId)
            ->select(
                'products.product_id',
                'products.title',
                'products.status',
                'products.github_link',
                'products.demo_link',
                'categories.category_name',
                'products.submitted_at'
            )
            ->latest('products.submitted_at')
            ->limit(30)
            ->get();

        /* Thống kê views / likes trong ngành */
        $topStats = DB::table('product_statistics')
            ->join('products', 'product_statistics.product_id', '=', 'products.product_id')
            ->where('products.major_id', $majorId)
            ->select(
                'products.title',
                'product_statistics.views',
                'product_statistics.likes'
            )
            ->orderByDesc('product_statistics.views')
            ->limit(10)
            ->get();

        /* Tags phổ biến trong ngành — dùng tag_name */
        $popularTags = DB::table('product_tags')
            ->join('products', 'product_tags.product_id', '=', 'products.product_id')
            ->where('products.major_id', $majorId)
            ->selectRaw('product_tags.tag_name, COUNT(*) as total')
            ->groupBy('product_tags.tag_name')
            ->orderByDesc('total')
            ->limit(10)
            ->get();

        /* Review của giảng viên trong ngành */
        $recentReviews = DB::table('reviews')
            ->join('products', 'reviews.product_id', '=', 'products.product_id')
            ->join('users', 'reviews.teacher_id', '=', 'users.id')
            ->where('products.major_id', $majorId)
            ->select(
                'products.title as product_title',
                'users.name as teacher_name',
                'reviews.comment',
                'reviews.created_at'
            )
            ->latest('reviews.created_at')
            ->limit(10)
            ->get();

        /* Danh mục có trong ngành */
        $categories = DB::table('categories')
            ->join('products', 'categories.cate_id', '=', 'products.cate_id')
            ->where('products.major_id', $majorId)
            ->selectRaw('categories.category_name, COUNT(*) as total')
            ->groupBy('categories.cate_id', 'categories.category_name')
            ->orderByDesc('total')
            ->get();

        /* Chi tiết chuyên ngành tùy major_code */
        $specializedData = $this->buildSpecializedData($majorId, $major->major_code);

        return [
            'major_name'      => $major->major_name,
            'major_code'      => $major->major_code,
            'role'            => $role,
            'product_count'   => count($products),
            'products'        => $products,
            'top_stats'       => $topStats,
            'popular_tags'    => $popularTags,
            'recent_reviews'  => $recentReviews,
            'categories'      => $categories,
            'specialized'     => $specializedData,
        ];
    }

    /**
     * Lấy chi tiết chuyên ngành theo major_code
     * AI, CNTT, Graphic, MMT có bảng riêng
     */
    private function buildSpecializedData(int $majorId, string $majorCode): array
    {
        $code = strtoupper($majorCode);

        if (str_contains($code, 'AI')) {
            return DB::table('product_ai')
                ->join('products', 'product_ai.product_id', '=', 'products.product_id')
                ->where('products.major_id', $majorId)
                ->select('products.title', 'product_ai.model_used', 'product_ai.framework', 'product_ai.language', 'product_ai.accuracy_score')
                ->limit(20)
                ->get()
                ->toArray();
        }

        if (str_contains($code, 'CNTT') || str_contains($code, 'IT')) {
            return DB::table('product_cntt')
                ->join('products', 'product_cntt.product_id', '=', 'products.product_id')
                ->where('products.major_id', $majorId)
                ->select('products.title', 'product_cntt.programming_language', 'product_cntt.framework', 'product_cntt.database_used')
                ->limit(20)
                ->get()
                ->toArray();
        }

        if (str_contains($code, 'GR') || str_contains($code, 'GRAPHIC')) {
            return DB::table('product_graphic')
                ->join('products', 'product_graphic.product_id', '=', 'products.product_id')
                ->where('products.major_id', $majorId)
                ->select('products.title', 'product_graphic.design_type', 'product_graphic.tools_used', 'product_graphic.behance_link')
                ->limit(20)
                ->get()
                ->toArray();
        }

        if (str_contains($code, 'MMT')) {
            return DB::table('product_mmt')
                ->join('products', 'product_mmt.product_id', '=', 'products.product_id')
                ->where('products.major_id', $majorId)
                ->select('products.title', 'product_mmt.simulation_tool', 'product_mmt.network_protocol', 'product_mmt.topology_type')
                ->limit(20)
                ->get()
                ->toArray();
        }

        return [];
    }

    private function buildGuestContext(): array
    {
        $majors = DB::table('majors')
            ->select('major_name', 'major_code')
            ->get();

        $categories = DB::table('categories')
            ->select('category_name')
            ->get();

        $totalProducts   = DB::table('products')->count();
        $totalCategories = $categories->count();

        /* Top 5 sản phẩm nổi bật */
        $featuredProducts = DB::table('product_statistics')
            ->join('products', 'product_statistics.product_id', '=', 'products.product_id')
            ->select('products.title', 'product_statistics.views', 'product_statistics.likes')
            ->orderByDesc('product_statistics.views')
            ->limit(5)
            ->get();

        return compact(
            'majors',
            'categories',
            'totalProducts',
            'totalCategories',
            'featuredProducts'
        );
    }

    /* ════════════════════════════════════════════════════════════════
     *  SYSTEM PROMPT
     * ════════════════════════════════════════════════════════════════ */

    private function buildSystemPrompt(string $role, array $data): string
    {
        $roleLabel = match ($role) {
            'admin'   => 'Quản trị viên',
            'teacher' => 'Giảng viên',
            'student' => 'Sinh viên',
            default   => 'Khách',
        };

        $dataJson = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

        return <<<PROMPT
Bạn là trợ lý thông minh của hệ thống quản lý đồ án / tài liệu học thuật.

THÔNG TIN NGƯỜI DÙNG:
- Vai trò: {$roleLabel} ({$role})

QUY TẮC BẮT BUỘC:
1. Chỉ sử dụng dữ liệu được cung cấp bên dưới, không bịa đặt
2. Không tiết lộ cấu trúc database, tên bảng, tên cột kỹ thuật
3. Trả lời bằng tiếng Việt, thân thiện và chính xác
4. Nếu câu hỏi ngoài phạm vi dữ liệu, hãy nói rõ không có thông tin đó
5. Khi liệt kê đồ án/tài liệu, trình bày gọn gàng theo danh sách
6. Với đồ án AI: có thể nêu model, framework, độ chính xác nếu được hỏi
7. Với đồ án CNTT: có thể nêu ngôn ngữ lập trình, framework, database
8. Với đồ án Graphic: có thể nêu loại thiết kế, công cụ, link Behance
9. Với đồ án MMT: có thể nêu công cụ mô phỏng, giao thức, topology

DỮ LIỆU HỆ THỐNG:
{$dataJson}
PROMPT;
    }
}

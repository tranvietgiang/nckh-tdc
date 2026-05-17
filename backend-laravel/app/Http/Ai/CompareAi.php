<?php

namespace App\Http\Ai;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use App\Repositories\ProductRepository;

class CompareAi
{
    public function __construct(
        protected ProductRepository $productRepository
    ) {}

    public function compareProduct(Request $request, int $productId)
    {
        try {

            if (!$this->productRepository->productExists($productId)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Sản phẩm không tồn tại',
                ], 404);
            }

            $currentProduct = $this->productRepository->compareData($productId);

            if (!$currentProduct) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy sản phẩm',
                ], 404);
            }

            // check AI
            $majorCode = strtolower(trim($currentProduct->major_name ?? ''));

            $isAI = str_contains($majorCode, 'ai')
                || str_contains($majorCode, 'trí tuệ')
                || str_contains($majorCode, 'artificial');

            if (!$isAI || !$currentProduct->model_used) {
                return response()->json([
                    'success' => true,
                    'status' => false,
                    'message' => 'Không phải AI product',
                    'current_product' => $this->formatProduct($currentProduct),
                    'matches' => [
                        'approved' => [],
                        'unapproved' => []
                    ],
                    'summary' => [
                        'match_count' => 0
                    ]
                ]);
            }

            $matchingProducts = $this->productRepository->findMatchingAiProducts($productId);
            $matchingProducts = array_slice($matchingProducts, 0, 5);

            $enriched = [];

            foreach ($matchingProducts as $product) {

                $gpt = $this->compareWithGPT($currentProduct, $product);

                $enriched[] = array_merge($product, [
                    'ai_similarity' => $gpt['similarity'] ?? 0,
                    'ai_level' => $gpt['level'] ?? 'low',
                    'ai_reason' => $gpt['reason'] ?? '',
                ]);
            }

            $approved = array_values(array_filter($enriched, fn($p) => $p['status'] === 'approved'));
            $unapproved = array_values(array_filter($enriched, fn($p) => $p['status'] !== 'approved'));

            return response()->json([
                'success' => true,

                // QUAN TRỌNG
                'status' => count($enriched) > 0,

                'current_product' => $this->formatProduct($currentProduct),

                'matches' => [
                    'approved' => $approved,
                    'unapproved' => $unapproved,
                ],

                'summary' => [
                    'match_count' => count($enriched),
                    'approved_count' => count($approved),
                    'unapproved_count' => count($unapproved),
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi hệ thống',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * GPT similarity check
     */
    private function compareWithGPT($a, $b)
    {
        try {
            $prompt = "
Compare 2 AI student projects.

Return JSON ONLY:

{
  \"similarity\": number (0-100),
  \"level\": \"low\" | \"medium\" | \"high\",
  \"reason\": \"short explanation\"
}

A:
Title: {$a->title}
Model: {$a->model_used}
Framework: {$a->framework}
Language: {$a->language}

B:
Title: {$b['title']}
Model: {$b['model_used']}
Framework: {$b['framework']}
Language: {$b['language']}
";

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
                'Content-Type' => 'application/json',
            ])->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4o-mini',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Return only valid JSON.'
                    ],
                    [
                        'role' => 'user',
                        'content' => $prompt
                    ]
                ],
                'temperature' => 0.2,
            ]);

            $content = $response->json()['choices'][0]['message']['content'] ?? null;

            return json_decode($content, true);
        } catch (\Exception $e) {
            Log::error('GPT Compare Error: ' . $e->getMessage());
            return null;
        }
    }

    private function formatProduct($p)
    {
        return [
            'product_id' => $p->product_id,
            'title' => $p->title,
            'description' => $p->description,
            'thumbnail' => $p->thumbnail,
            'status' => $p->status,
            'created_at' => $p->created_at,
            'approved_at' => $p->approved_at,
            'fullname' => $p->fullname,
            'major_name' => $p->major_name,
            'model_used' => $p->model_used,
            'framework' => $p->framework,
            'language' => $p->language,
            'dataset_used' => $p->dataset_used,
            'accuracy_score' => $p->accuracy_score,
        ];
    }
}

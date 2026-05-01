<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\common\normalizeMajorCode;

class UploadRequest extends FormRequest
{

    public function __construct(
        protected normalizeMajorCode $normalizeMajorCode
    ) {}

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    // function normalizeMajorCode(?string $value): ?string
    // {
    //     if (!$value) return null;

    //     $v = mb_strtolower(trim($value), 'UTF-8');

    //     $map = [
    //         'ai' => [
    //             'ai',
    //             'artificial intelligence',
    //             'trí tuệ nhân tạo',
    //         ],
    //         'cntt' => [
    //             'cntt',
    //             'it',
    //             'công nghệ thông tin',
    //             'information technology',
    //         ],
    //         'mmt' => [
    //             'mmt',
    //             'mạng máy tính',
    //             'computer network',
    //             'computer networks',
    //         ],
    //         'tkdh' => [
    //             'tkdh',
    //             'thiết kế đồ họa',
    //             'graphic design',
    //         ],
    //     ];

    //     foreach ($map as $code => $keywords) {
    //         foreach ($keywords as $keyword) {
    //             if ($v === $keyword || str_contains($v, $keyword)) {
    //                 return $code;
    //             }
    //         }
    //     }

    //     return null;
    // }


    public function rules(): array
    {
        $rules = [
            // CHUNG
            'title' => 'required|string|min:5|max:100',
            'description' => 'required|string|min:10|max:300',

            'cate_id' => 'required|exists:categories,cate_id',

            // đổi từ major_id → major_code
            'major_code' => 'required|string',

            'major_id' => 'required',

            'images' => 'required|array|min:1|max:10',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:5120',

            'files' => 'nullable|array|max:5',
            'files.*' => 'file|max:10240',

            'github_link' => 'nullable|url',
            'demo_link' => 'nullable|url',

            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
        ];

        $majorCode = $this->major_code;

        $check  = $this->normalizeMajorCode->normalizeMajorCode($majorCode);

        switch ($check) {
            case 'ai':
                $rules['model_used'] = 'required|string|max:100';
                $rules['framework'] = 'required|string|max:100';
                $rules['language'] = 'required|string|max:50';
                $rules['dataset_used'] = 'required|string|max:100';
                $rules['accuracy_score'] = 'nullable|numeric|min:0|max:100';
                break;
            case 'cntt':
                $rules['programming_language'] = 'required|string|max:50';
                $rules['framework'] = 'nullable|string|max:100';
                $rules['database_used'] = 'nullable|string|max:100';
                break;
            case 'tkdh':
                $rules['design_type'] = 'required|string|max:50';
                $rules['tools_used'] = 'required|string|max:150';

                $rules['drive_link'] = 'nullable|url|max:255';
                $rules['behance_link'] = 'nullable|url|max:255';
                break;
            case 'mmt':
                $rules['simulation_tool'] = 'required|string|max:100';
                $rules['network_protocol'] = 'required|string|max:100';
                $rules['topology_type'] = 'required|string|max:50';
                $rules['config_file'] = 'required|string|max:225';
                break;
            default:
                break;
        }

        return $rules;
    }

    public function messages()
    {
        return [
            // TITLE
            'title.required' => 'Vui lòng nhập tên sản phẩm',
            'title.min' => 'Tên phải ≥ 5 ký tự',
            'title.max' => 'Tên tối đa 100 ký tự',

            // DESCRIPTION
            'description.required' => 'Vui lòng nhập mô tả',
            'description.min' => 'Mô tả phải ≥ 10 ký tự',
            'description.max' => 'Mô tả tối đa 300 ký tự',

            // CATEGORY
            'cate_id.required' => 'Chọn danh mục',

            // MAJOR
            'major_code.required' => 'Không xác định được ngành',
            'major_id.required' => 'Thiếu thông tin ngành',

            // IMAGES
            'images.required' => 'Cần ít nhất 1 ảnh',
            'images.min' => 'Cần ít nhất 1 ảnh',
            'images.max' => 'Tối đa 10 ảnh',

            // FILES
            'files.max' => 'Tối đa 5 file',

            // LINKS
            'github_link.url' => 'Link GitHub không hợp lệ',
            'demo_link.url' => 'Link demo không hợp lệ',

            // ================= AI =================
            'model_used.required' => 'Nhập model sử dụng',
            'framework.required' => 'Nhập framework',
            'language.required' => 'Nhập ngôn ngữ sử dụng',
            'dataset_used.required' => 'Nhập dataset sử dụng',
            'accuracy_score.numeric' => 'Accuracy phải là số',
            'accuracy_score.min' => 'Accuracy ≥ 0',
            'accuracy_score.max' => 'Accuracy ≤ 100',

            // ================= CNTT =================
            'programming_language.required' => 'Nhập ngôn ngữ lập trình',
            'database_used.max' => 'Database tối đa 100 ký tự',

            // ================= TKĐH =================
            'design_type.required' => 'Chọn loại thiết kế',
            'tools_used.required' => 'Nhập công cụ sử dụng',

            // ================= MMT =================
            'simulation_tool.required' => 'Nhập công cụ mô phỏng',
            'network_protocol.required' => 'Nhập giao thức mạng',
            'topology_type.required' => 'Chọn topology',
            'config_file.required' => 'Thiếu file cấu hình',
        ];
    }
}

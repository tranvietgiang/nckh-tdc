<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    public function rules(): array
    {
        return [
            // TITLE
            'title' => 'required|string|min:5|max:100',

            // DESCRIPTION
            'description' => 'required|string|min:10|max:300',

            // CATEGORY
            'cate_id' => 'required',

            // MAJOR (frontend có nhưng chưa validate → backend vẫn nên có)
            'major_id' => 'required',

            // IMAGES
            'images' => 'required|array|min:1|max:10',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:5120',

            // FILES
            'files' => 'nullable|array|max:5',
            'files.*' => 'file|max:10240',

            // LINKS
            'github_link' => 'nullable|url',
            'demo_link' => 'nullable|url',

            // TAGS
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:50',
        ];
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

            // IMAGES
            'images.required' => 'Cần ít nhất 1 ảnh',
            'images.min' => 'Cần ít nhất 1 ảnh',
            'images.max' => 'Tối đa 10 ảnh',

            // FILES
            'files.max' => 'Tối đa 5 file',

            // LINKS
            'github_link.url' => 'Link GitHub không hợp lệ',
            'demo_link.url' => 'Link demo không hợp lệ',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
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

    public function rules(): array
    {
        $allRules = [
            'title'         => 'required|string|max:255',
            'description'   => 'nullable|string',
            'thumbnail'     => 'nullable|url|max:255',
            'github_link'   => 'nullable|url|max:255',
            'demo_link'     => 'nullable|url|max:255',
            'status'        => 'required|in:pending,approved,rejected',
            'user_id'       => 'required|string|max:15|exists:users,user_id',
            'major_id'      => 'required|integer|exists:majors,major_id',
            'cate_id'       => 'required|integer|exists:categories,cate_id',
            'approved_by'   => 'nullable|string|max:15|exists:users,user_id',
            'submitted_at'  => 'nullable|date',
            'approved_at'   => 'nullable|date',
        ];

        // Lấy chỉ những trường xuất hiện trong request
        return array_intersect_key($allRules, $this->all());
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $table = 'products';
    protected $primaryKey = 'product_id';
    protected $keyType = 'int';
    public $incrementing = true;

    protected $fillable = [
        'title',
        'description',
        'thumbnail',
        'github_link',
        'demo_link',
        'status',
        'user_id',
        'major_id',
        'cate_id',
        'approved_by',
        'approved_at'
    ];
}

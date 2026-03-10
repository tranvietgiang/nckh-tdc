<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    //
    protected $table = 'product_images';
    protected $primaryKey = 'image_id';
    protected $keyType = 'int';
    public $incrementing = true;

    protected $fillable = [
        'product_id',
        'image_url'
    ];
}

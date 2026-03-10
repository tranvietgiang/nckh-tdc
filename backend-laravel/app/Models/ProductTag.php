<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductTag extends Model
{
    //
    protected $table = 'product_tags';
    protected $primaryKey = 'product_tag_id';
    protected $keyType = 'int';
    public $incrementing = true;

    protected $fillable = [
        'product_id',
        'tag_id'
    ];
}

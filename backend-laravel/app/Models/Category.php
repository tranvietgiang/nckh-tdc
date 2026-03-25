<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
    protected $table = 'categories';
    protected $primaryKey = 'cate_id';
    protected $keyType = 'int';
    public $incrementing = true;

    protected $fillable = [
        'category_name',
        'description'
    ];
}

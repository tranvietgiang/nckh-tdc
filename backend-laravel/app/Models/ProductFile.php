<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductFile extends Model
{
    //
    protected $table = 'product_files';
    protected $primaryKey = 'file_id';
    protected $keyType = 'int';
    public $incrementing = true;

    protected $fillable = [
        'product_id',
        'file_url',
        'file_type'
    ];
}

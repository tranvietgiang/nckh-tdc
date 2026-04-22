<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CNTT extends Model
{
    //
    protected $table = 'product_cntt';
    protected $primaryKey = 'product_cntt_id';
    protected $keyType = 'int';
    public $incrementing = true;

    protected $fillable = [
        'product_id',
        'programming_language',
        'framework',
        'database_used',
    ];
}

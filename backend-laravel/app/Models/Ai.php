<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ai extends Model
{
    //
    protected $table = 'product_ai';
    protected $primaryKey = 'product_ai_id';
    protected $keyType = 'int';
    public $incrementing = true;

    protected $fillable = [
        'product_id',
        'model_used',
        'framework',
        'language',
        'dataset_used',
        'accuracy_score',
    ];

    protected $casts = [
        'accuracy_score' => 'float',
    ];
}

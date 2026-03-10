<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    //
    protected $table = 'tags';
    protected $primaryKey = 'tag_id';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = [
        'tag_name'
    ];
}

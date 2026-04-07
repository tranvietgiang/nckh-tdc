<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Major extends Model
{
    //
    protected $primaryKey = 'major_id';
    protected $table = 'majors';
    protected $keyType = 'int';
    public $incrementing = true;

    protected $fillable = [
        'major_name',
        'description'
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductMMT extends Model
{
    //

    protected $table = 'product_mmt';
    protected $primaryKey = 'product_mmt_id';
    protected $keyType = 'int';
    public $incrementing = true;

    protected $fillable = [
        'product_id',
        'simulation_tool',
        'network_protocol',
        'topology_type',
        'config_file',
        'github_link',
        'demo_link',
    ];
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hospital extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];
    
    public $timestamps = true;

 
}

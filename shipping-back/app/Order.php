<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'orders';

        /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
         'user_id','shipment_id'
    ];
    public $timestamps = false;
}

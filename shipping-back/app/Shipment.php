<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
      /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'shipments';

        /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'waybill','customer_name', 'customer_address','phone_number'
    ];
    public $timestamps = false;
}

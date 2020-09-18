<?php

namespace App\Http\Controllers;

use App\Shipment;
use App\Order;
use App\User;
use Illuminate\Http\Request;

class ShipmentsController extends Controller
{
    /**
     * DIsplay shipments related to logged in user.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    { 
        $shipments = Order::join('users', 'orders.user_id', '=', $id)
                              ->join('shipments', 'orders.shipment_id', '=', 'shipments.id')
                              ->select('shipments.customer_name','shipments.customer_address','shipments.phone_number','shipments.waybill')
                              ->get();
        return   $shipments ;
    }


    /**
     * Store a new shipment
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $shipment = new Shipment;

        $shipment->customer_name = $request->customer_name;
        $shipment->customer_address = $request->customer_address;
        $shipment->phone_number = $request->phone_number;
        $shipment->waybill = $request->waybill;

        $shipment->save();

        $order = new Order;

        $order->shipment_id = $shipment->id;
        $order->user_id = $request->user_id; //get user id from local storage

        $order->save();
    }

    /**
     * Update shipment info by shipment id
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Shipment  $shipment
     * @return \Illuminate\Http\Response
     */
    public function update($id,Request $request)
    {
        $shipment = Shipment::find($id);

        $shipment->customer_name = $request->customer_name;
        $shipment->customer_address = $request->customer_address;
        $shipment->phone_number = $request->phone_number;
        $shipment->waybill = $request->waybill;

        $shipment->save();
    }

    /**
     * Remove shipment by shipment id
     *
     * @param  \App\Shipment  $shipment
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $shipment = Shipment::find($id);
        $shipment->delete();

        $order = Order::where('shipment_id', $id);
        $order->delete();
    }
}

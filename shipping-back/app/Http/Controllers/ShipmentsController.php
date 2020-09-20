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
    public function index(Request $request)
    { 
        $userId = $request->query('id');
        $shipments = Order::join('users', 'orders.user_id', '=', 'users.id')
                              ->join('shipments', 'orders.shipment_id', '=', 'shipments.id')
                              ->select('shipments.customer_name','shipments.customer_address','shipments.phone_number','shipments.waybill')
                              ->where('orders.user_id', $userId)
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
        $userId = User::where('username',$request->username)->value('id');
        $order->shipment_id = $shipment->id;
        $order->user_id = $userId; //get user id from above

        $order->save();
    }

    /**
     * Update shipment info by shipment id
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Shipment  $shipment
     * @return \Illuminate\Http\Response
     */
    public function update($shipment,Request $request)
    {
        $customerName = $shipment;
        $shipmentId = Order::join('users', 'orders.user_id', '=', 'users.id')
                                     ->join('shipments', 'orders.shipment_id', '=', 'shipments.id')
                                     ->select('shipments.id','shipments.customer_address','shipments.phone_number','shipments.waybill')
                                      ->where('shipments.customer_name',$customerName)
                                      ->value('id');

        $shipment = Shipment::find($shipmentId);

        $shipment->customer_name = $customerName;
        $shipment->customer_address = $request->customer_address;
        $shipment->phone_number = $request->phone_number;
        $shipment->waybill = $request->waybill;

        $shipment->save();

        return response()->json(['message'=>'update successful']);
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

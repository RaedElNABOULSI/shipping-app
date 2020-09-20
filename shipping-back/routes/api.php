<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('user', 'UsersController');
Route::resource('shipment', 'ShipmentsController');

// -----Login -------------------------------
Route::post('login', function (Request $request) {
    $credentials = $request->only('username', 'password');
    $username = $request->username;
    $userId = User::where('username', $username)->value('id');
    if (!Auth::attempt($credentials)) {
        return error;
    }
    // Authentication passed...
    return response(array(
                     'user_id'=>$userId,
                     'username' =>$username,
                     'message' => 'Login Successful!',
    ));
});
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
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
   if (count(User::where('username', $request->username)->get()) > 0) {
      $user = User::where('username', $request->username)->first();
      $auth = Hash::check($request->password, $user->password);

      if ($user && $auth) {
         $user->rollApiKey(); 
         return response(array(
            'currentUser' => $user,
            'message' => 'Login Successful!',
         ));
      }

      return [
         'id' => 2,
         'user' => $user,
         'pass' => $auth
      ];
   }

   return response(array(
      'message' => 'Unauthorized, check your credentials.',
   ), 401);
});
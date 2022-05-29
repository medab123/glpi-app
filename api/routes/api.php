<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\apiController;

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

Route::get('/', function(){
    return [
        'Success' => true,
    ];
})->middleware('cors');

Route::group(['middleware' => ['cors']], function () {
    Route::post('/ticketParEntiter/', [apiController::class,'ticketParEntiter']);
    Route::post('/ticketResoluByEntiter/', [apiController::class,'TicketResoluByEntiter']);
    Route::post('/satisfactionByEntiter/', [apiController::class,'satisfactionByEntiter']);
    Route::post('/satisfactionByTechnicien/', [apiController::class,'satisfactionByTechnicien']);
    Route::post('/ticketByTechnicien/', [apiController::class,'ticketByTechnicien']);
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

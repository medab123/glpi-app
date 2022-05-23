<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\apiController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::group(['middleware' => ['cors']], function () {
    Route::get('/ticketParEntiter/{date1}/{date2}', [apiController::class,'ticketParEntiter']);
    Route::get('/ticketResoluByEntiter/{date1}/{date2}', [apiController::class,'TicketResoluByEntiter']);
    Route::get('/satisfactionByEntiter/{date1}/{date2}', [apiController::class,'satisfactionByEntiter']);
    Route::get('/satisfactionByTechnicien/{date1}/{date2}', [apiController::class,'satisfactionByTechnicien']);
    Route::get('/ticketByTechnicien/{date1}/{date2}', [apiController::class,'ticketByTechnicien']);
});

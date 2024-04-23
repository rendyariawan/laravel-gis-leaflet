<?php

use App\Http\Controllers\LeafletController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/map', function () {
    return view('leaflet.home');
});

Route::get('/marker', function () {
    return view('leaflet.marker');
});

Route::get('/tampil-marker', function () {
    return view('leaflet.tampil-marker');
});

Route::get('/upload', function () {
    return view('leaflet.upload');
});





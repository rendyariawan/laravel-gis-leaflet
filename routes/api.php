<?php

use App\Http\Controllers\authController;
use App\Http\Controllers\LeafletController;
use App\Http\Controllers\productController;
use App\Http\Controllers\SendMailController;
use App\Http\Controllers\ViewFoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function(){
    return response()->json([
        'status' => false,
        'message' => 'akses tidak diperbolehkan'
    ], 401);
})->name('login');


Route::post('registerUser', [authController::class, 'registerUser']);
Route::post('loginUser', [authController::class, 'loginUser'])->middleware('throttle:login');

Route::group(['middleware' => ['auth:sanctum', 'checkHost', 'checkEmail']], function () {
    // Rute-rute yang memerlukan autentikasi dan pengecekan role
    Route::get('product', [productController::class, 'index'])->middleware(('ablity:product-list'));
    Route::get('product/{id}', [productController::class, 'show'])->middleware(('ablity:product-list'));
    Route::put('product/{id}', [productController::class, 'update'])->middleware(('ablity:product-list'));
    Route::delete('product/{id}', [productController::class, 'destroy'])->middleware(('ablity:product-list'));
    Route::post('product', [productController::class, 'store'])->middleware(('ablity:product-store'));
    Route::post('logoutUser', [authController::class, 'logout']);
    Route::get('me', [authController::class, 'me']);
    Route::get('refresh', [authController::class, 'refreshToken']);
});

Route::post('verification', [authController::class, 'verificationToken']);
Route::post('refreshverification', [authController::class, 'refreshVerificationToken']);

Route::post('forgot-password-act', [SendMailController::class, 'forgotPassword']);
Route::post('forgot-password-act-validasi', [authController::class, 'validasiForgotPassword']);

Route::post('geojson', [LeafletController::class, 'storeGeojson']);
Route::post('titikkoordinat', [LeafletController::class, 'storeTitikKoordinat']);
Route::get('semuatitikkoordinat', [LeafletController::class, 'getTitikKoordinat']);
Route::get('get-image/{id}', [LeafletController::class, 'getImageKoordinat']);
Route::post('post-image', [LeafletController::class, 'storeTitikKoordinat']);


Route::get('private/{file}', [ViewFoto::class, 'viewFoto'])->name('private');



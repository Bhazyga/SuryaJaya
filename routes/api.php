<?php


use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\MaterialController;
use App\Http\Controllers\bangunRumahController;
use App\Http\Controllers\BeliMaterialController;
use App\Http\Controllers\CalculatorController;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/users',UserController::class);
});

Route::post('/index', [AuthController::class,'index']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/bangunrumah', [bangunRumahController::class,'bangunrumah']);
Route::apiResource('/materials', MaterialController::class);
Route::get('/materials/{id}', [MaterialController::class, 'show']);
Route::get('/BeliMaterialDetail/{id}', [MaterialController::class, 'detailUserBeli']);




// Route::post('/BeliMaterial', [BeliMaterialController::class, 'beliMaterial']);
// Route::post('/Materials/create', [MaterialController::class, 'create']);

<?php

use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\ResourceController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (butuh token)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/menus', [MenuController::class, 'index']);
    Route::get('/resources', [ResourceController::class, 'index']);
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
});
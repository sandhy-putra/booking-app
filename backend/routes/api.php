<?php

use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\ResourceController;
use App\Http\Controllers\Api\BookingController;
use Illuminate\Support\Facades\Route;

Route::get('/menus', [MenuController::class, 'index']);
Route::get('/resources', [ResourceController::class, 'index']);
Route::get('/bookings', [BookingController::class, 'index']);
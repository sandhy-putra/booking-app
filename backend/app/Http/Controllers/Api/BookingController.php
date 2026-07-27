<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;

class BookingController extends Controller
{
    public function index()
    {
        return response()->json(Booking::with(['resource', 'user'])->get());
    }

    public function store(StoreBookingRequest $request)
    {
        $booking = Booking::create([
            ...$request->validated(),
            'user_id' => $request->user()?->id ?? 1, // sementara hardcode dulu, nanti diganti auth()->id()
            'status' => 'pending',
        ]);

    }
}
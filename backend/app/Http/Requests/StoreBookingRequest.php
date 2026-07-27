<?php

namespace App\Http\Requests;

use App\Models\Booking;
use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'resource_id' => 'required|exists:resources,id',
            'tanggal' => 'required|date',
            'jam_mulai' => 'required|date_format:H:i',
            'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
            'keterangan' => 'nullable|string',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $bentrok = Booking::where('resource_id', $this->resource_id)
                ->where('tanggal', $this->tanggal)
                ->whereIn('status', ['pending', 'approved'])
                ->where(function ($q) {
                    $q->whereBetween('jam_mulai', [$this->jam_mulai, $this->jam_selesai])
                      ->orWhereBetween('jam_selesai', [$this->jam_mulai, $this->jam_selesai])
                      ->orWhere(function ($q2) {
                          $q2->where('jam_mulai', '<=', $this->jam_mulai)
                             ->where('jam_selesai', '>=', $this->jam_selesai);
                      });
                })
                ->exists();

            if ($bentrok) {
                $validator->errors()->add('jam_mulai', 'Resource sudah dibooking pada rentang waktu tersebut.');
            }
        });
    }
}
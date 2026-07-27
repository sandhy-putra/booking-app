<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = ['resource_id', 'user_id', 'tanggal', 'jam_mulai', 'jam_selesai', 'status', 'keterangan'];

    protected $casts = [
        'tanggal' => 'date',
    ];

    public function resource()
    {
        return $this->belongsTo(Resource::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
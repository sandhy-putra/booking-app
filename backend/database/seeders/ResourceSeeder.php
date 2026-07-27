<?php

namespace Database\Seeders;

use App\Models\Resource;
use Illuminate\Database\Seeder;

class ResourceSeeder extends Seeder
{
    public function run(): void
    {
        Resource::create(['nama' => 'Ruang Meeting A', 'deskripsi' => 'Ruang meeting lantai 1', 'kapasitas' => 10]);
        Resource::create(['nama' => 'Ruang Meeting B', 'deskripsi' => 'Ruang meeting lantai 2', 'kapasitas' => 6]);
        Resource::create(['nama' => 'Ruang Konsultasi', 'deskripsi' => 'Ruang konsultasi privat', 'kapasitas' => 2]);
    }
}
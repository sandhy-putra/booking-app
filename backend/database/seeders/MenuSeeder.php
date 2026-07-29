<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        // Level 1
        $dashboard = Menu::create(['nama' => 'Dashboard', 'icon' => '🏠', 'route' => '/dashboard', 'urutan' => 1]);
        $booking = Menu::create(['nama' => 'Booking', 'icon' => '📅', 'urutan' => 2]);
        $master = Menu::create(['nama' => 'Master Data', 'icon' => '🗄️', 'urutan' => 3]);

        // Level 2 - anak dari Booking
        $bookingList = Menu::create(['nama' => 'Daftar Booking', 'route' => '/booking/list', 'urutan' => 1, 'parent_id' => $booking->id]);
        $bookingBaru = Menu::create(['nama' => 'Booking Baru', 'route' => '/booking/create', 'urutan' => 2, 'parent_id' => $booking->id]);

        // Level 2 - anak dari Master Data
        $masterResource = Menu::create(['nama' => 'Resource', 'urutan' => 1, 'parent_id' => $master->id]);
        $masterMenu = Menu::create(['nama' => 'Menu', 'route' => '/master/menu', 'urutan' => 2, 'parent_id' => $master->id]);

        // Level 3 - anak dari Resource (nunjukin beranak-pinak beneran jalan)
        Menu::create(['nama' => 'Daftar Resource', 'route' => '/master/resource/list', 'urutan' => 1, 'parent_id' => $masterResource->id]);
        Menu::create(['nama' => 'Tambah Resource', 'route' => '/master/resource/create', 'urutan' => 2, 'parent_id' => $masterResource->id]);
    }
}
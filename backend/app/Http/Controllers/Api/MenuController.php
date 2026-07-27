<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;

class MenuController extends Controller
{
    public function index()
    {
        // ambil cuma menu root (parent_id null), children-nya ikut ke-load recursive
        $menus = Menu::whereNull('parent_id')
            ->orderBy('urutan')
            ->with('childrenRecursive')
            ->get();

        return response()->json($menus);
    }
}
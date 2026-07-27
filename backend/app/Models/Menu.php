<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = ['parent_id', 'nama', 'icon', 'route', 'urutan', 'is_active'];

    public function parent()
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Menu::class, 'parent_id')->orderBy('urutan');
    }

    // load semua turunan sampai level paling dalam (recursive)
    public function childrenRecursive()
    {
        return $this->children()->with('childrenRecursive');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_menu');
    }
}
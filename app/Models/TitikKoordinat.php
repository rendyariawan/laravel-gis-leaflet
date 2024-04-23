<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class TitikKoordinat extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'wilayah', 'geometry', 'keterangan'];

    public function image(){
        return $this->hasMany(ImageGeojson::class, 'titikkoordinat_id_koordinat', 'id_koordinat');
    }

    protected static function boot()
    {
        parent::boot();

        // Event 'deleting' dipanggil saat instance User dihapus
        static::deleting(function ($titikkoordinate) {
            // Hapus foto-foto terkait dari penyimpanan saat pengguna dihapus
            foreach ($titikkoordinate->photos as $photo) {
                Storage::delete('public/images/' . basename($photo->url));
            }
            // Hapus foto-foto terkait dari database saat pengguna dihapus
            $titikkoordinate->iamage()->delete();
        });
    }

}

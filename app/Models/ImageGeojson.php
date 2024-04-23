<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageGeojson extends Model
{
    use HasFactory;
    protected $fillable = ['filename', 'titikkoordinat_id_koordinat'];

    public function titikkoordinat(){
        return $this->belongsTo(TitikKoordinat::class);
    }

    protected static function boot()
    {
        parent::boot();

        // Event 'deleting' dipanggil saat instance Photo dihapus
        static::deleting(function ($photo) {
            // Hapus file dari sistem file saat foto dihapus
            $filePath = public_path($photo->url);
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        });
    }
    
}
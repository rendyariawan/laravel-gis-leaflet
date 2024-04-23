<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('image_geojsons', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('titikkoordinat_id_koordinat');
            $table->foreign('titikkoordinat_id_koordinat')->references('id_koordinat')->on('titik_koordinats')->onDelete('cascade');
            $table->string('filename'); // Kolom untuk menyimpan URL gambar
            $table->string('description')->nullable(); // Kolom untuk deskripsi foto (opsional)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('image_geojsons');
    }
};

<?php

namespace App\Http\Controllers;

use App\Models\ImageGeojson;
use App\Models\TitikKoordinat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LeafletController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function getImageKoordinat( String $id)
    {
        $image = ImageGeojson::where('titikkoordinat_id_koordinat', $id)->get();
        return response()->json($image);
    }

    public function getTitikKoordinat()
    {
        $locations = TitikKoordinat::with('image')->get();
        $geojson = [
            'type' => 'FeatureCollection',
            'features' => []
        ];

        foreach ($locations as $location ) {

            $geojson['features'][] = [
                'type' => 'Feature',
                'geometry' => json_decode($location->geometry),
                'properties' => [
                    'name' => $location->name,
                    'keterangan' => $location->keterangan,
                    'wilayah' => $location->wilayah,
                    // tambahkan properti lainnya jika diperlukan
                ],
                'id' => $location->id_koordinat,
                'image' => $location->image
            ];
        }

        return response()->json($geojson);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeGeojson(Request $request)
    {
        
        
    }

    public function storeTitikKoordinat(Request $request)
    {
        if ($request->hasFile('files')) {
            $uploadedFiles = [];

            // Retrieve corresponding name and keterangan for the file
                $name = $request->input('name') ?? ''; // Assuming 'name' is an array in the form
                $keterangan = $request->input('keterangan') ?? ''; // Assuming 'keterangan' is an array in the form
                $coordinates = $request->input('coordinates') ?? ''; // Assuming 'coordinates' is an array in the form
                $wilayah = $request->input('wilayah') ?? ''; // Assuming 'filename' is an array in the form
                
                // Save to database
                $titikKoordinat = new TitikKoordinat();
                $titikKoordinat->name = $name;
                $titikKoordinat->keterangan = $keterangan;
                $titikKoordinat->wilayah = $wilayah;
                $titikKoordinat->geometry = $coordinates;
                $titikKoordinat->save();

            foreach ($request->file('files') as $index => $file) {
                // Store each file individually
                $date = date('Y-m-d');
                $filename = $date . '_' . time() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('public/images', $filename); // Assuming 'uploads' is your storage path

                $image = new ImageGeojson();
                $image->titikkoordinat_id_koordinat = $titikKoordinat->id;
                $image->filename = $filename;
                $image->save();
                
                
            }

            return response()->json(['success' => true, 'message' => 'Files uploaded successfully']);
        }

        return response()->json(['success' => false, 'message' => 'No files selected for upload']);

    }

    /**
     * Display t
     * he specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

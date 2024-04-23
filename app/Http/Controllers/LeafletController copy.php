<?php

namespace App\Http\Controllers;

use App\Models\TitikKoordinat;
use Illuminate\Http\Request;

class LeafletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getTitikKoordinat()
    {
        $locations = TitikKoordinat::all();
        $geojson = [
            'type' => 'FeatureCollection',
            'features' => []
        ];

        foreach ($locations as $location) {
            $geojson['features'][] = [
                'type' => 'Feature',
                'geometry' => json_decode($location->geometry),
                'properties' => [
                    'name' => $location->name,
                    // tambahkan properti lainnya jika diperlukan
                ]
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

            foreach ($request->file('files') as $index => $file) {
                // Store each file individually
                $date = date('Y-m-d');
                $filename = $date . '_' . time() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('public/images', $filename); // Assuming 'uploads' is your storage path
                
                // Retrieve corresponding name and keterangan for the file
                $name = $request->input('name') ?? ''; // Assuming 'name' is an array in the form
                $keterangan = $request->input('keterangan') ?? ''; // Assuming 'keterangan' is an array in the form
                $coordinates = $request->input('coordinates') ?? ''; // Assuming 'coordinates' is an array in the form
                
                // Save to database
                $titikKoordinat = new TitikKoordinat();
                $titikKoordinat->name = $name;
                $titikKoordinat->keterangan = $keterangan;
                $titikKoordinat->image = $filename;
                $titikKoordinat->geometry = $coordinates;
                $titikKoordinat->save();
            }

            return response()->json(['success' => true, 'message' => 'Files uploaded successfullyy', 'files' => $uploadedFiles]);
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

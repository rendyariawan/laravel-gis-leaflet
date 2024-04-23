@extends('layouts.app')

@section('css')
     <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" />
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
     <style>
        #map { height: 550px; }
        #preview img { max-height: 100px; padding: 10px;}
     </style>
@endsection

@section('content')
<section class="content">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Map</div>
                <div class="card-body">
                    <div class="container-fluid">
                        <div id="map"></div>
                    </div>
                </div>
            </div>        
        </div>
        <div class="col-md">
            <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">Masukan Data</h3>
                </div>

                <div class="card-body">
                <form id="uploadForm" enctype="multipart/form-data">
                    <div class="form-group">
                        <label>Geojson</label>
                        <textarea class="form-control bg-white" id="coordinates" rows="2" placeholder="Geojson" readonly></textarea>
                      </div>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Name">
                    </div>
                    <div class="form-group">
                        <label for="keterangan">Keterangan</label>
                        <input type="text" class="form-control" id="keterangan" placeholder="Keterangan">
                    </div>
                    <div class="form-group">
                        <label for="wilayah">Wilayah</label>
                        <input type="text" class="form-control" id="wilayah" placeholder="Wilayah">
                    </div>
                    
                    <div class="form-group">
                        <label for="files">File input</label>
                        <div class="input-group">
                        <div class="custom-file">
                            <input type="file" name="files[]" class="custom-file-input" id="files" multiple>
                            <label class="custom-file-label" for="files">Choose file</label>
                        </div>
                        </div>
                    </div>
                    <div class="mb-3">
                            <div id="preview"></div>
                        </div>
                    <!-- /.card-body -->

                    <div class="card-footer text-center bg-white">
                    <button type="submit" onclick="submitForm()" class="btn btn-primary">Kirim Data Baru</button>
                    </div>
                </form>
                </div>



                <!-- <div class="card-body">
                    <form id="uploadForm" enctype="multipart/form-data">
                        @csrf
                        <div class="mb-3">
                            <label class="form-label" for="coordinates">Geojson</label>
                            <textarea class="form-control" id="coordinates" rows="3" readonly></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="name">Name</label>
                            <input type="text" class="form-control" name="name" id="name" placeholder="Name">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="keterangan">Keterangan</label>
                            <input type="text" class="form-control" name="keterangan" id="keterangan" placeholder="Keterangan">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="wilayah">Wilayah</label>
                            <input type="text" class="form-control" name="wilayah" id="wilayah" placeholder="Wilayah">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="files">Multiple files input example</label>
                            <input type="file" class="form-control" name="files[]" id="files" multiple>
                        </div>
                        <div class="mb-3">
                            <div id="preview"></div>
                        </div>
                        <button type="button" onclick="submitForm()" class="btn btn-primary">Upload Files</button>
                    </form>
                </div> -->
            </div>     
        </div>
    </div>
      
</section>
@endsection('content')

@push('javascript')

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="{{ asset('leaflet/map.js') }}"></script>
    <script src="{{ asset('leaflet/marker.js') }}"></script>
@endpush
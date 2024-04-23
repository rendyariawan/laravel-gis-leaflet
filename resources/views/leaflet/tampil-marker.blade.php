@extends('layouts.app')

@section('css')
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.css" />
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.Default.css" />

<style>
  #map {
    height: 500px;
  }
</style>

@endsection

@section('content')
<section class="content">

  <!-- map  -->
  <div id="map"></div>
  <!-- map  -->

  <!-- modal  -->
  <div class="modal fade" id="layerModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="layerName"></h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="col-12">
            <div class="card card-primary">
              <div class="card-header">
                <h4 class="card-title">Ekko Lightbox</h4>
              </div>
              <div class="card-body ">
                <div class="row" id="theDiv">
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="card card-primary">
              <div class="card-header">
                <h4 class="card-title">Ekko Lightbox</h4>
              </div>
              <div class="card-body ">
                <p><strong>Nama:</strong> <span id="layerWilayah"></span></p>
                <p><strong>Keterangan:</strong> <span id="layerDescription"></span></p>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div> -->
      </div>
    </div>
  </div>
  <!-- /.modal -->
</section>
@endsection('content')

@push('javascript')
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://unpkg.com/leaflet.markercluster/dist/leaflet.markercluster.js"></script>

<script src="{{ asset('leaflet/map.js') }}"></script>
<script src="{{ asset('leaflet/tampil-marker.js') }}"></script>


@endpush
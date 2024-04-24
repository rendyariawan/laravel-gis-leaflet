$.ajax({
    url: "/api/semuatitikkoordinat",
    type: "GET",
    dataType: "json",
    success: function (data) {
        // Inisialisasi cluster group
        var markers = L.markerClusterGroup();

        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                if (feature.properties && feature.properties.name) {
                    layer.on("click", function (e) {
                        let image = feature.image;
                        const images = image.map(function (image) {

                            const filename = image.filename || "";

                            const gambar =
                                '<div class="col-sm-4"><a target="_blank" href="http://127.0.0.1:8000/storage/images/' +
                                filename +
                                '" data-toggle="lightbox" data-title="sample 1 - white" data-gallery="gallery"><img class="img-fluid mb-2" alt="white sample" src="http://127.0.0.1:8000/storage/images/' +
                                filename +
                                '"/></a></div>';

                            return gambar;
                        });

                        $("#layerModal").modal("show");
                        $("#layerName").text(feature.properties.name);
                        $("#layerWilayah").text(feature.properties.wilayah);
                        $("#layerDescription").text(
                            feature.properties.keterangan
                        );
                        $("#theDiv").html(images);
                    });

                    layer.on("mouseover", function (e) {
                        e.layer.bindPopup(feature.properties.name).openPopup();
                    });

                    layer.on("mouseout", function (e) {
                        e.layer.closePopup();
                    });
                }
                markers.addLayer(layer);
            },
        });

        map.addLayer(markers);
    },
});

$(".content-header").css("display", "none");
$("#map").css({ height: "600px" });

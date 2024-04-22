var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
    },
    draw: {
        polygon: true,
        polyline: true,
        rectangle: true,
        circle: true,
        marker: true,
    },
});
map.addControl(drawControl);

map.on("draw:created", function (e) {
    var layer = e.layer;
    drawnItems.clearLayers();
    drawnItems.addLayer(layer);
    $("#coordinates").html(JSON.stringify(drawnItems.toGeoJSON()));
});

map.on("draw:edited", function (e) {
    var layers = e.layers;
    layers.eachLayer(function (layer) {
        $("#coordinates").html(JSON.stringify(drawnItems.toGeoJSON()));
    });
});

map.on("draw:deleted", function (e) {
    var layers = e.layers;
    layers.eachLayer(function (layer) {
        $("#coordinates").html("");
    });
});

const preview = (file) => {
    const fr = new FileReader();
    fr.onload = () => {
        const img = document.createElement("img");
        img.src = fr.result; // String Base64
        img.alt = file.name;
        document.querySelector("#preview").append(img);
    };
    fr.readAsDataURL(file);
};

document.querySelector("#files").addEventListener("change", (ev) => {
    if (!ev.target.files) return; // Do nothing.
    [...ev.target.files].forEach(preview);
});

function submitForm() {
    $("#uploadForm").submit(function (e) {
        e.preventDefault();

        var formData = new FormData();
        var files = $("#files")[0].files;

        // Append files to FormData object
        for (var i = 0; i < files.length; i++) {
            formData.append("files[]", files[i]);
        }

        // Append other inputs
        formData.append("name", $("#name").val());
        formData.append("keterangan", $("#keterangan").val());
        formData.append("wilayah", $("#wilayah").val());
        formData.append("coordinates", $("#coordinates").val());

        // Send AJAX request
        $.ajax({
            url: "/api/post-image",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                alert(response);
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            },
        });
    });
}

var colors = [
    "#058DC7",
    "#50B432",
    "#ED561B",
    "#DDDF00",
    "#24CBE5",
    "#64E572",
    "#FF9655",
    "#FFF263",
    "#6AF9C4",
    "#058DC7",
    "#50B432",
    "#ED561B",
    "#DDDF00",
    "#24CBE5",
    "#64E572",
    "#FF9655",
    "#FFF263",
    "#6AF9C4",
    "#058DC7",
    "#50B432",
    "#ED561B",
    "#DDDF00",
    "#24CBE5",
    "#64E572",
    "#FF9655",
    "#FFF263",
    "#6AF9C4",
    "#058DC7",
    "#50B432",
    "#ED561B",
    "#DDDF00",
    "#24CBE5",
    "#64E572",
    "#FF9655",
    "#FFF263",
    "#6AF9C4",
    "#058DC7",
    "#50B432",
    "#ED561B",
    "#DDDF00",
    "#24CBE5",
    "#64E572",
    "#FF9655",
    "#FFF263",
    "#6AF9C4",
    "#058DC7",
    "#50B432",
    "#ED561B",
    "#DDDF00",
    "#24CBE5",
    "#64E572",
    "#FF9655",
    "#FFF263",
    "#6AF9C4",
    "#058DC7",
    "#50B432",
    "#ED561B",
    "#DDDF00",
    "#24CBE5",
    "#64E572",
    "#FF9655",
    "#FFF263",
    "#6AF9C4",
    "#058DC7",
    "#50B432",
    "#ED561B",
    "#DDDF00",
    "#24CBE5",
    "#64E572",
    "#FF9655",
    "#FFF263",
    "#6AF9C4",
    "#058DC7",
    "#50B432",
    "#ED561B",
    "#DDDF00",
    "#24CBE5",
    "#64E572",
    "#FF9655",
    "#FFF263",
    "#6AF9C4",
    "#058DC7",
    "#50B432",
    "#ED561B",
    "#DDDF00",
    "#24CBE5",
    "#64E572",
    "#FF9655",
    "#FFF263",
    "#6AF9C4",
];

var map;

var arcUrl =
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    osmUrl =
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    mapBoxUrl =
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaW1hbmhlcm1hd2FuIiwiYSI6ImNqamk4dzRiNDF4cDEzdnAya3RtemdmbnIifQ.GFqj1SL9UcdzowPm0joADQ";

var arcMap = L.tileLayer(arcUrl, {
        minZoom: 0,
        maxZoom: 23,
        preferCanvas: true,
        detectRetina: true,
        attribution: "&copy; Esri, FAO, NOAA",
    }),
    mapSatellite = L.tileLayer(mapBoxUrl, {
        minZoom: 0,
        maxZoom: 23,
        preferCanvas: true,
        detectRetina: true,
        attribution: "&copy; Mapbox &copy; OpenStreetMap",
        id: "mapbox/satellite-v9",
    }),
    mapStreets = L.tileLayer(mapBoxUrl, {
        minZoom: 0,
        maxZoom: 23,
        preferCanvas: true,
        attribution: "&copy; Mapbox &copy; OpenStreetMap",
        id: "mapbox/streets-v12",
    });

var baseLayers = {
    Streets: arcMap,
    Satellite: mapSatellite,
    Mapbox: mapStreets,
};

var elementApp = document.querySelector("#kt_app_sidebar");
$(document).on("click", '[data-kt-element="send"]', function (e) {
    handleApp(elementApp);
});

const fetchData = async (num) => {
    try {
        await Promise.all(
            [
                Env.BASE_URL + "api/get_institution/" + num,
                Env.BASE_URL + "api/get_assets/" + num,
                Env.BASE_URL + "api/get_locations/" + num,
            ].map((endpoint) => axios.get(endpoint))
        )
            .then(
                ([
                    { data: institution },
                    { data: assets },
                    { data: location },
                ]) => {
                    $("#nsm").val(institution.statistic_num);
                    $("#npsn").val(institution.npsn);
                    $("#name").val(institution.name);
                    $("#accreditation_status").val(
                        institution.accreditation_status
                    );
                    $("#phone").val(institution.phone);
                    $("#address").val(institution.address);
                    $("#sub_district").val(institution.sub_district);
                    $("#district").val(institution.district);
                    $("#city").val(institution.city);
                    $("#province").val(institution.province);
                    $("#longitude").val(institution.longitude);
                    $("#latitude").val(institution.latitude);
                    $("#geographic_category").val(location.geographic_category);
                    $("#region_category").val(location.region_category);
                    $("#to_provincial_center").val(
                        location.to_provincial_capital_center
                    );
                    $("#to_city_center").val(location.to_city_center);
                    $("#to_district_center").val(location.to_district_center);
                    $("#nearest_mi").val(location.nearest_mi);
                    $("#nearest_mts").val(location.nearest_mts);
                    $("#nearest_ma").val(location.nearest_ma);
                    $("#nearest_ptki").val(location.nearest_ptki);
                    $("#nearest_elementary_school").val(
                        location.nearest_elementary_school
                    );
                    $("#nearest_junior_high_school").val(
                        location.nearest_junior_high_school
                    );
                    $("#nearest_senior_high_school").val(
                        location.nearest_senior_high_school
                    );
                    $("#student_count").val(institution.student_count);
                    $("#rombel_count").val(institution.rombel_count);
                    $(".student_male").text(institution.student_male);
                    $(".student_female").text(institution.student_female);
                    $("#personnel_teacher").val(institution.personnel_teacher);
                    $("#personnel_education_staff").val(
                        institution.personnel_education_staff
                    );
                    $(".teacher_male").text(institution.teacher_male);
                    $(".teacher_female").text(institution.teacher_female);
                    $(".teacher_pns").text(institution.teacher_pns);
                    $(".teacher_non_pns").text(institution.teacher_non_pns);
                    $(".education_staff_male").text(
                        institution.education_staff_male
                    );
                    $(".education_staff_female").text(
                        institution.education_staff_female
                    );
                    $(".education_staff_pns").text(
                        institution.education_staff_pns
                    );
                    $(".education_staff_non_pns").text(
                        institution.education_staff_non_pns
                    );
                    $("#logo").attr("src", institution.logo);
                    $("#land_total").val(assets.land_total);
                    $("#building_total").val(assets.building_total);
                    $("#open_field").val(
                        assets.land_total - assets.building_total
                    );
                    $(".land_owned").text(assets.land_owned);
                    $(".land_waqaf").text(assets.land_waqaf);
                    $(".land_hgb").text(assets.land_hgb);
                    $(".land_rented").text(assets.land_rented);
                    $(".land_borrowed").text(assets.land_borrowed);
                    $(".class_good").text(assets.class_good);
                    $(".class_lightly_damaged").text(
                        assets.class_lightly_damaged
                    );
                    $(".class_moderately_damaged").text(
                        assets.class_moderately_damaged
                    );
                    $(".class_heavily_damaged").text(
                        assets.class_heavily_damaged
                    );
                    $(".class_totally_damaged").text(
                        assets.class_totally_damaged
                    );
                    $(".class_total").text(assets.class_total);
                    $(".principal_good").text(assets.principal_good);
                    $(".principal_lightly_damaged").text(
                        assets.principal_lightly_damaged
                    );
                    $(".principal_moderately_damaged").text(
                        assets.principal_moderately_damaged
                    );
                    $(".principal_heavily_damaged").text(
                        assets.principal_heavily_damaged
                    );
                    $(".principal_totally_damaged").text(
                        assets.principal_totally_damaged
                    );
                    $(".principal_total").text(assets.principal_total);
                    $(".teacher_good").text(assets.teacher_good);
                    $(".teacher_lightly_damaged").text(
                        assets.teacher_lightly_damaged
                    );
                    $(".teacher_moderately_damaged").text(
                        assets.teacher_moderately_damaged
                    );
                    $(".teacher_heavily_damaged").text(
                        assets.teacher_heavily_damaged
                    );
                    $(".teacher_totally_damaged").text(
                        assets.teacher_totally_damaged
                    );
                    $(".teacher_total").text(assets.teacher_total);
                    $(".administration_good").text(assets.administration_good);
                    $(".administration_lightly_damaged").text(
                        assets.administration_lightly_damaged
                    );
                    $(".administration_moderately_damaged").text(
                        assets.administration_moderately_damaged
                    );
                    $(".administration_heavily_damaged").text(
                        assets.administration_heavily_damaged
                    );
                    $(".administration_totally_damaged").text(
                        assets.administration_totally_damaged
                    );
                    $(".administration_total").text(
                        assets.administration_total
                    );
                    $(".library_good").text(assets.library_good);
                    $(".library_lightly_damaged").text(
                        assets.library_lightly_damaged
                    );
                    $(".library_moderately_damaged").text(
                        assets.library_moderately_damaged
                    );
                    $(".library_heavily_damaged").text(
                        assets.library_heavily_damaged
                    );
                    $(".library_totally_damaged").text(
                        assets.library_totally_damaged
                    );
                    $(".library_total").text(assets.library_total);
                    $(".male_dorm_good").text(assets.male_dorm_good);
                    $(".male_dorm_lightly_damaged").text(
                        assets.male_dorm_lightly_damaged
                    );
                    $(".male_dorm_moderately_damaged").text(
                        assets.male_dorm_moderately_damaged
                    );
                    $(".male_dorm_heavily_damaged").text(
                        assets.male_dorm_heavily_damaged
                    );
                    $(".male_dorm_totally_damaged").text(
                        assets.male_dorm_totally_damaged
                    );
                    $(".male_dorm_total").text(assets.male_dorm_total);
                    $(".female_dorm_good").text(assets.female_dorm_good);
                    $(".female_dorm_lightly_damaged").text(
                        assets.female_dorm_lightly_damaged
                    );
                    $(".female_dorm_moderately_damaged").text(
                        assets.female_dorm_moderately_damaged
                    );
                    $(".female_dorm_heavily_damaged").text(
                        assets.female_dorm_heavily_damaged
                    );
                    $(".female_dorm_totally_damaged").text(
                        assets.female_dorm_totally_damaged
                    );
                    $(".female_dorm_total").text(assets.female_dorm_total);
                    $(".workshop_good").text(assets.workshop_good);
                    $(".workshop_lightly_damaged").text(
                        assets.workshop_lightly_damaged
                    );
                    $(".workshop_moderately_damaged").text(
                        assets.workshop_moderately_damaged
                    );
                    $(".workshop_heavily_damaged").text(
                        assets.workshop_heavily_damaged
                    );
                    $(".workshop_totally_damaged").text(
                        assets.workshop_totally_damaged
                    );
                    $(".workshop_total").text(assets.workshop_total);
                }
            )
            .catch(function (error) {
                toastr.error("Can't process this request!");
            });
    } catch (error) {
        console.log(error);
    }
};

const myModalEl = document.getElementById("myModal");

var detailFeature = function (num, title) {
    $(myModalEl).find(".modal-title").text(title);
    fetchData(num);
    $(".modal-body").load(Env.BASE_URL + "home/view");
    new bootstrap.Modal(myModalEl).show();
};

var handleApp = function (element) {
    var province = element.querySelector("#provinsi");
    var city = element.querySelector("#kota");
    var cbStatus = element.querySelectorAll('[name="status[]"]:checked');
    var status = [];

    if (province.value === "00") {
        return;
    }

    city = city.value ? city.value : "";

    Array.from(cbStatus).forEach((item) => {
        status.push(item.value);
    });

    $.ajax({
        url: Env.BASE_URL + "home/index",
        type: "POST",
        data: {
            status: status,
        },
    }).done(function (response) {
        location.href =
            Env.BASE_URL + "home/index/" + province.value + "/" + city;
    });
};

new Autocomplete("search", {
    selectFirst: true,
    howManyCharacters: 3,
    onSearch: ({ currentValue }) => {
        const api = `${Env.BASE_URL}home/search?key=${encodeURI(currentValue)}`;

        return new Promise((resolve) => {
            fetch(api)
                .then((response) => response.json())
                .then((data) => {
                    resolve(data.features);
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    },
    onResults: ({ currentValue, matches, template }) => {
        const regex = new RegExp(currentValue, "gi");

        return matches === 0
            ? template
            : matches
                  .map((element) => {
                      return `<li class="d-flex flex-column text-dark text-hover-primary py-2">
                        <span class="fw-bold fs-5 mb-0">
                        ${element.properties.name.replace(
                            regex,
                            (str) => `<b>${str}</b>`
                        )}
                            </span>
                            <span class="fw-semibold fs-base text-muted">${
                                element.properties.address
                            }</span>
                        </li>`;
                  })
                  .join("");
    },
    onSubmit: ({ object }) => {
        map.eachLayer(function (layer) {
            if (!!layer.toGeoJSON) {
                map.removeLayer(layer);
            }
        });

        const { name } = object.properties;
        const [lng, lat] = object.geometry.coordinates;

        const marker = L.marker([lat, lng], {
            title: name,
            num: object.properties.num,
        });

        function markerOnClick(e) {
            L.DomEvent.stopPropagation(e);
            var title = this.options.title,
                num = this.options.num;
            detailFeature(num, title);
        }

        marker.addTo(map).bindTooltip(name);
        marker.on("click", markerOnClick);
        map.flyTo([lat, lng], 13);
    },
    onSelectedItem: ({ index, element, object }) => {
        console.log("onSelectedItem:", index, element, object);
    },
    noResults: ({ currentValue, template }) =>
        template(`<li><div class="text-center">
    <div class="pt-10 pb-5">
	<span class="ki-duotone ki-search-list fs-4x opacity-50"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
    </div>
    <div class="pb-15 fw-semibold">
        <h3 class="text-gray-600 fs-5 mb-2">Hasil tidak ditemukan</h3>
        <div class="text-muted fs-7">Silakan coba lagi dengan kueri yang berbeda</div>
    </div>
</div></li>`),
});
var totalRa = 11,
    totalMi = 9,
    totalMts = 6,
    totalMa = 3,
    totalSch = 29;

var table;

table = $("#mytable").DataTable({
    dom:
        "<'row'" +
        "<'col-sm-6 d-flex align-items-center justify-conten-start'B>" +
        "<'col-sm-6 d-flex align-items-center justify-content-end'f>" +
        ">" +
        "<'table-responsive'tr>" +
        "<'row'" +
        "<'col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'li>" +
        "<'col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'p>" +
        ">",
    language: {
        search: "_INPUT_",
        searchPlaceholder: "Cari",
        zeroRecords: "Data tidak ditemukan",
        info: "_START_ - _END_ dari _TOTAL_ data",
        infoEmpty: "Data belum tersedia",
        infoFiltered: "(filtered from _MAX_ total records)",
    },
    buttons: {
        dom: {
            button: {
                tag: "button",
                className: "",
            },
        },
        buttons: [
            {
                extend: "excel",
                className: "btn btn-light-primary",
                text: '<i class="ki-duotone ki-file-down fs-1 fs-md-1 me-1"><span class="path1"></span><span class="path2"></span></i><span>Excel</span>',
            },
        ],
    },
    lengthMenu: [
        [25, 50, -1],
        [25, 50, "All"],
    ],
    processing: true,
    serverSide: true,
    deferRender: true,
    ajax: {
        url: Env.BASE_URL + "home/json",
        type: "POST",
        data: function (data) {
            var status = [];

            $('[name="status[]"]:checked').each(function () {
                status.push($(this).val());
            });

            data.province = $("#provinsi").val();
            data.city = $("#kota").val();
            data.status = status;
        },
    },
    columns: [
        {
            data: "nsm",
        },
        {
            data: "nsm",
            render: function (data, type, row) {
                return (
                    '<a class="identify" href="#" data-id="' +
                    data +
                    '" data-title="' +
                    row.nama_madrasah +
                    '">' +
                    data +
                    "</a>"
                );
            },
        },
        {
            data: "nama_madrasah",
        },
        {
            data: "kelurahan",
        },
        {
            data: "nama_kecamatan",
        },
        {
            data: "nama_kabupaten",
        },
    ],
    fnRowCallback: function (nRow, aData, iDisplayIndex) {
        var info = $(this).DataTable().page.info();
        $("td:nth-child(1)", nRow).html(info.start + iDisplayIndex + 1);
        return nRow;
    },
});

$("#mytable tbody").on("click", ".identify", function () {
    var num = $(this).data("id"),
        title = $(this).data("title");
    detailFeature(num, title);
});

$("div.dt-buttons > button > span").contents().unwrap();

var updateMap = function () {
    var province = $("#provinsi").val();
    var city = $("#kota").val();
    var status = [];

    $('[name="status[]"]:checked').each(function () {
        status.push($(this).val());
    });

    var target = document.querySelector(".map-area");

    var blockUI = new KTBlockUI(target, {
        message:
            '<div class="blockui-message"><span class="spinner-border text-primary"></span> mengambil data...</div>',
        overlayClass: "bg-dark bg-opacity-50",
    });

    blockUI.block();

    const options = {
        params: {
            province: province,
            city: city,
            level: $('[name="level[]"]').val(),
            status: status,
        },
    };

    async function getData() {
        try {
            let res = await axios.get(
                Env.BASE_URL + "home/get_cluster",
                options
            );
            return res.data;
        } catch (err) {
            console.error(err);
        }
    }

    getData().then(function (data) {
        updateCheckboxStates();

        function onEachFeature(feature, layer) {
            if (feature.properties) {
                layer.on({
                    click: function (e) {
                        L.DomEvent.stopPropagation(e);
                        identifyFeature(L.stamp(layer));
                        map.panTo(L.latLng(layer.getLatLng()));
                    },
                });
                layer.bindTooltip(feature.properties.nama_madrasah);
            }
        }

        const mcg = L.markerClusterGroup({
            chunkedLoading: true,
            chunkInterval: 100,
            maxClusterRadius: 20,
            removeOutsideVisibleBounds: true,
        }).addTo(map);

        const geojsonLayer = L.geoJSON(null, {
            filter: function (feature) {
                var schooltypeFilter = [];
                $("input[name=fltschooltype]").each(function () {
                    if (this.checked) {
                        schooltypeFilter.push(this.value);
                    }
                });
                $("input[name=fltschool]").each(function () {
                    if (this.checked) {
                        schooltypeFilter.push(this.value);
                    }
                });

                var att = feature.properties;
                var isLevelChecked = schooltypeFilter.indexOf(att.level) >= 0;
                var isGoodChecked = schooltypeFilter.indexOf(att.good) >= 0;
                var isLightlyChecked =
                    schooltypeFilter.indexOf(att.lightly_damaged) >= 0;
                var isModeratelyChecked =
                    schooltypeFilter.indexOf(att.moderately_damaged) >= 0;
                var isHeavilyChecked =
                    schooltypeFilter.indexOf(att.heavily_damaged) >= 0;
                var isTotallyChecked =
                    schooltypeFilter.indexOf(att.totally_damaged) >= 0;
                return (
                    isLevelChecked &&
                    (isGoodChecked ||
                        isLightlyChecked ||
                        isModeratelyChecked ||
                        isHeavilyChecked ||
                        isTotallyChecked)
                );
            },
            onEachFeature: onEachFeature,
        });

        function identifyFeature(id) {
            var featureProperties =
                geojsonLayer.getLayer(id).feature.properties;
            var title = featureProperties.nama_madrasah;
            num = featureProperties.nsm;
            detailFeature(num, title);
        }

        function updateCheckboxStates() {
            var schooltypeFilter = [];
            $("input[name=fltschooltype]").each(function () {
                if (this.checked) {
                    schooltypeFilter.push(this.value);
                }
            });
            $("input[name=fltschool]").each(function () {
                if (this.checked) {
                    schooltypeFilter.push(this.value);
                }
            });
        }

        for (let input of document.querySelectorAll("input")) {
            input.onchange = (e) => {
                mcg.clearLayers();
                geojsonLayer.clearLayers();
                updateCheckboxStates();
                geojsonLayer.addData(data.features).addTo(mcg);
            };
        }

        geojsonLayer.addData(data.features).addTo(mcg);

        const totalGood = data.features.filter(
                (feature) => feature.properties.good !== "N"
            ).length,
            totalLightly = data.features.filter(
                (feature) => feature.properties.lightly_damaged !== "N"
            ).length,
            totalModerately = data.features.filter(
                (feature) => feature.properties.moderately_damaged !== "N"
            ).length,
            totalHeavily = data.features.filter(
                (feature) => feature.properties.heavily_damaged !== "N"
            ).length,
            totally = data.features.filter(
                (feature) => feature.properties.totally_damaged !== "N"
            ).length;

        document.querySelector("#good + label span").textContent =
            new Intl.NumberFormat("id-ID").format(totalGood);
        document.querySelector("#lightly + label span").textContent =
            new Intl.NumberFormat("id-ID").format(totalLightly);
        document.querySelector("#moderately + label span").textContent =
            new Intl.NumberFormat("id-ID").format(totalModerately);
        document.querySelector("#heavily + label span").textContent =
            new Intl.NumberFormat("id-ID").format(totalHeavily);
        document.querySelector("#totally + label span").textContent =
            new Intl.NumberFormat("id-ID").format(totally);

        if (blockUI.isBlocked()) {
            blockUI.release();
        }
    });
};

map = L.map("mapid", {
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: "topleft",
    },
    zoomControl: true,
    layers: [arcMap],
}).setView([-2.13333, 106.133], 5, {
    animation: true,
});

L.control
    .layers(baseLayers, null, {
        position: "topleft",
    })
    .addTo(map);

//L.control.scale().addTo(map);

const info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create("div", "info");
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML =
        "<h4>Peta Wilayah</h4>" +
        (props ? "<b>" + props.name + "</b>" : "KOTA PANGKAL PINANG");
};

info.addTo(map);

const legend = L.control({
    position: "bottomleft",
});

legend.onAdd = function () {
    const div = L.DomUtil.create("div", "description");
    L.DomEvent.disableClickPropagation(div);

    const markersRa = L.DomUtil.create("div", "d-flex markers-ra");
    markersRa.insertAdjacentHTML(
        "beforeend",
        '<span>Raudhatul Athfal</span><span class="ms-auto fw-bold">' +
            new Intl.NumberFormat("id-ID").format(totalRa) +
            "</span>"
    );

    const markersMi = L.DomUtil.create("div", "d-flex markers-mi");
    markersMi.insertAdjacentHTML(
        "beforeend",
        '<span>Madrasah Ibtidaiyah</span><span class="ms-auto fw-bold">' +
            new Intl.NumberFormat("id-ID").format(totalMi) +
            "</span>"
    );

    const markersMts = L.DomUtil.create("div", "d-flex markers-mts");
    markersMts.insertAdjacentHTML(
        "beforeend",
        '<span>Madrasah Tsanawiyah</span><span class="ms-auto fw-bold">' +
            new Intl.NumberFormat("id-ID").format(totalMts) +
            "</span>"
    );

    const markersMa = L.DomUtil.create("div", "d-flex markers-ma");
    markersMa.insertAdjacentHTML(
        "beforeend",
        '<span>Madrasah Aliyah</span><span class="ms-auto  fw-bold">' +
            new Intl.NumberFormat("id-ID").format(totalMa) +
            "</span>"
    );

    const allMarkers = L.DomUtil.create("div", "d-flex all-markers");
    allMarkers.insertAdjacentHTML(
        "beforeend",
        '<span>Jumlah Madrasah</span><span class="ms-auto fw-bold">' +
            new Intl.NumberFormat("id-ID").format(totalSch) +
            "</span>"
    );

    div.appendChild(markersRa);
    div.appendChild(markersMi);
    div.appendChild(markersMts);
    div.appendChild(markersMa);
    div.appendChild(allMarkers);
    return div;
};

legend.addTo(map);

const legend2 = L.control({
    position: "topright",
});

legend2.onAdd = function () {
    let div = L.DomUtil.create(
        "div",
        "leaflet-control-layers leaflet-control-layers-expanded"
    );
    L.DomEvent.disableClickPropagation(div);
    const text =
        '<div class="leaflet-control-layers-group" id="types">' +
        '<label class="leaflet-control-layers-group-label"><span class="leaflet-control-layers-group-name">Kondisi Gedung</span></label>' +
        '<div class="form-check form-check-custom form-check-solid form-check-sm my-1"><input class="form-check-input" type="radio" name="fltschool" value="good" id="good" checked="true"><label class="ms-2" for="good">Baik (<span>0</span>)</label></div>' +
        '<div class="form-check form-check-custom form-check-solid form-check-sm my-1"><input class="form-check-input" type="radio" name="fltschool" value="lightly" id="lightly"><label for="lightly" class="ms-2">Rusak Ringan (<span>0</span>)</label></div>' +
        '<div class="form-check form-check-custom form-check-solid form-check-sm my-1"><input class="form-check-input" type="radio" name="fltschool" value="moderately" id="moderately"><label class="ms-2" for="moderately">Rusak Sedang (<span>0</span>)</label></div>' +
        '<div class="form-check form-check-custom form-check-solid form-check-sm my-1"><input class="form-check-input" type="radio" name="fltschool" value="heavily" id="heavily"><label class="ms-2" for="heavily">Rusak Berat (<span>0</span>)</label></div>' +
        '<div class="form-check form-check-custom form-check-solid form-check-sm my-1"><input class="form-check-input" type="radio" name="fltschool" value="totally" id="totally"><label class="ms-2" for="totally">Rusak Total (<span>0</span>)</label></div>' +
        "</div>" +
        '<div class="leaflet-control-layers-group" id="levels">' +
        '<label class="leaflet-control-layers-group-label"><span class="leaflet-control-layers-group-name">Jenjang</span></label>' +
        '<div class="form-check form-check-custom form-check-solid form-check-sm my-1"><input class="form-check-input" type="checkbox" class="level" name="fltschooltype" value="RA" id="RA" checked="true"><label class="ms-2" for="RA">RA</label></div>' +
        '<div class="form-check form-check-custom form-check-solid form-check-sm my-1"><input class="form-check-input" type="checkbox" class="level" name="fltschooltype" value="MI" id="MI" checked="true"><label class="ms-2" for="MI">MI</label></div>' +
        '<div class="form-check form-check-custom form-check-solid form-check-sm my-1"><input class="form-check-input" type="checkbox" class="level" name="fltschooltype" value="MTS" id="MTS" checked="true"><label class="ms-2" for="MTS">MTS</label></div>' +
        '<div class="form-check form-check-custom form-check-solid form-check-sm my-1"><input class="form-check-input" type="checkbox" class="level" name="fltschooltype" value="MA" id="MA" checked="true"><label class="ms-2" for="MA">MA</label></div>' +
        "</div>";
    div.insertAdjacentHTML("beforeend", text);
    return div;
};

legend2.addTo(map);

var geojson;

$.getJSON(
    "https://madrasah.kemenag.go.id/gis/assets/geojson/1901.geojson",
    function (result) {
        var style = {
            fillColor: colors[0],
            color: colors[0],
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7,
        };

        geojson = L.geoJson(result, {
            style: style,
            onEachFeature: function (feature, layer) {
                var popup = L.popup();

                function onMapClick(e) {
                    popup
                        .setLatLng(e.latlng)
                        .setContent(
                            "<ul class='list-group list-group p-0'>" +
                                "<li class='list-group-item active'>KABUPATEN BANGKA</li>" +
                                "<li class='list-group-item'><a href='https://madrasah.kemenag.go.id/gis/home/index/19/1901'>58 Madrasah</a></li>" +
                                "</ul>"
                        )
                        .openOn(map);
                }

                layer.on("mouseover", function () {
                    this.setStyle({
                        fillColor: colors[0],
                        color: colors[0],
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.5,
                    });
                    if (!L.Browser.ie && !L.Browser.opera) {
                        layer.bringToFront();
                    }
                    info.update(layer.feature.properties);
                });

                layer.on("mouseout", function () {
                    this.setStyle(style);
                    info.update();
                });

                layer.on("click", onMapClick);
            },
        });
        map.addLayer(geojson);
    }
);
$.getJSON(
    "https://madrasah.kemenag.go.id/gis/assets/geojson/1903.geojson",
    function (result) {
        var style = {
            fillColor: colors[1],
            color: colors[1],
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7,
        };

        geojson = L.geoJson(result, {
            style: style,
            onEachFeature: function (feature, layer) {
                var popup = L.popup();

                function onMapClick(e) {
                    popup
                        .setLatLng(e.latlng)
                        .setContent(
                            "<ul class='list-group list-group p-0'>" +
                                "<li class='list-group-item active'>KABUPATEN BANGKA BARAT</li>" +
                                "<li class='list-group-item'><a href='https://madrasah.kemenag.go.id/gis/home/index/19/1903'>25 Madrasah</a></li>" +
                                "</ul>"
                        )
                        .openOn(map);
                }

                layer.on("mouseover", function () {
                    this.setStyle({
                        fillColor: colors[1],
                        color: colors[1],
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.5,
                    });
                    if (!L.Browser.ie && !L.Browser.opera) {
                        layer.bringToFront();
                    }
                    info.update(layer.feature.properties);
                });

                layer.on("mouseout", function () {
                    this.setStyle(style);
                    info.update();
                });

                layer.on("click", onMapClick);
            },
        });
        map.addLayer(geojson);
    }
);
$.getJSON(
    "https://madrasah.kemenag.go.id/gis/assets/geojson/1905.geojson",
    function (result) {
        var style = {
            fillColor: colors[2],
            color: colors[2],
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7,
        };

        geojson = L.geoJson(result, {
            style: style,
            onEachFeature: function (feature, layer) {
                var popup = L.popup();

                function onMapClick(e) {
                    popup
                        .setLatLng(e.latlng)
                        .setContent(
                            "<ul class='list-group list-group p-0'>" +
                                "<li class='list-group-item active'>KABUPATEN BANGKA SELATAN</li>" +
                                "<li class='list-group-item'><a href='https://madrasah.kemenag.go.id/gis/home/index/19/1905'>26 Madrasah</a></li>" +
                                "</ul>"
                        )
                        .openOn(map);
                }

                layer.on("mouseover", function () {
                    this.setStyle({
                        fillColor: colors[2],
                        color: colors[2],
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.5,
                    });
                    if (!L.Browser.ie && !L.Browser.opera) {
                        layer.bringToFront();
                    }
                    info.update(layer.feature.properties);
                });

                layer.on("mouseout", function () {
                    this.setStyle(style);
                    info.update();
                });

                layer.on("click", onMapClick);
            },
        });
        map.addLayer(geojson);
    }
);
$.getJSON(
    "https://madrasah.kemenag.go.id/gis/assets/geojson/1904.geojson",
    function (result) {
        var style = {
            fillColor: colors[3],
            color: colors[3],
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7,
        };

        geojson = L.geoJson(result, {
            style: style,
            onEachFeature: function (feature, layer) {
                var popup = L.popup();

                function onMapClick(e) {
                    popup
                        .setLatLng(e.latlng)
                        .setContent(
                            "<ul class='list-group list-group p-0'>" +
                                "<li class='list-group-item active'>KABUPATEN BANGKA TENGAH</li>" +
                                "<li class='list-group-item'><a href='https://madrasah.kemenag.go.id/gis/home/index/19/1904'>28 Madrasah</a></li>" +
                                "</ul>"
                        )
                        .openOn(map);
                }

                layer.on("mouseover", function () {
                    this.setStyle({
                        fillColor: colors[3],
                        color: colors[3],
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.5,
                    });
                    if (!L.Browser.ie && !L.Browser.opera) {
                        layer.bringToFront();
                    }
                    info.update(layer.feature.properties);
                });

                layer.on("mouseout", function () {
                    this.setStyle(style);
                    info.update();
                });

                layer.on("click", onMapClick);
            },
        });
        map.addLayer(geojson);
    }
);
$.getJSON(
    "https://madrasah.kemenag.go.id/gis/assets/geojson/1902.geojson",
    function (result) {
        var style = {
            fillColor: colors[4],
            color: colors[4],
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7,
        };

        geojson = L.geoJson(result, {
            style: style,
            onEachFeature: function (feature, layer) {
                var popup = L.popup();

                function onMapClick(e) {
                    popup
                        .setLatLng(e.latlng)
                        .setContent(
                            "<ul class='list-group list-group p-0'>" +
                                "<li class='list-group-item active'>KABUPATEN BELITUNG</li>" +
                                "<li class='list-group-item'><a href='https://madrasah.kemenag.go.id/gis/home/index/19/1902'>21 Madrasah</a></li>" +
                                "</ul>"
                        )
                        .openOn(map);
                }

                layer.on("mouseover", function () {
                    this.setStyle({
                        fillColor: colors[4],
                        color: colors[4],
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.5,
                    });
                    if (!L.Browser.ie && !L.Browser.opera) {
                        layer.bringToFront();
                    }
                    info.update(layer.feature.properties);
                });

                layer.on("mouseout", function () {
                    this.setStyle(style);
                    info.update();
                });

                layer.on("click", onMapClick);
            },
        });
        map.addLayer(geojson);
    }
);
$.getJSON(
    "https://madrasah.kemenag.go.id/gis/assets/geojson/1906.geojson",
    function (result) {
        var style = {
            fillColor: colors[5],
            color: colors[5],
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7,
        };

        geojson = L.geoJson(result, {
            style: style,
            onEachFeature: function (feature, layer) {
                var popup = L.popup();

                function onMapClick(e) {
                    popup
                        .setLatLng(e.latlng)
                        .setContent(
                            "<ul class='list-group list-group p-0'>" +
                                "<li class='list-group-item active'>KABUPATEN BELITUNG TIMUR</li>" +
                                "<li class='list-group-item'><a href='https://madrasah.kemenag.go.id/gis/home/index/19/1906'>9 Madrasah</a></li>" +
                                "</ul>"
                        )
                        .openOn(map);
                }

                layer.on("mouseover", function () {
                    this.setStyle({
                        fillColor: colors[5],
                        color: colors[5],
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.5,
                    });
                    if (!L.Browser.ie && !L.Browser.opera) {
                        layer.bringToFront();
                    }
                    info.update(layer.feature.properties);
                });

                layer.on("mouseout", function () {
                    this.setStyle(style);
                    info.update();
                });

                layer.on("click", onMapClick);
            },
        });
        map.addLayer(geojson);
    }
);
$.getJSON(
    "https://madrasah.kemenag.go.id/gis/assets/geojson/1971.geojson",
    function (result) {
        var style = {
            fillColor: colors[6],
            color: colors[6],
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7,
        };

        geojson = L.geoJson(result, {
            style: style,
            onEachFeature: function (feature, layer) {
                var popup = L.popup();

                function onMapClick(e) {
                    popup
                        .setLatLng(e.latlng)
                        .setContent(
                            "<ul class='list-group list-group p-0'>" +
                                "<li class='list-group-item active'>KOTA PANGKAL PINANG</li>" +
                                "<li class='list-group-item'><a href='https://madrasah.kemenag.go.id/gis/home/index/19/1971'>29 Madrasah</a></li>" +
                                "</ul>"
                        )
                        .openOn(map);
                }

                layer.on("mouseover", function () {
                    this.setStyle({
                        fillColor: colors[6],
                        color: colors[6],
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.5,
                    });
                    if (!L.Browser.ie && !L.Browser.opera) {
                        layer.bringToFront();
                    }
                    info.update(layer.feature.properties);
                });

                layer.on("mouseout", function () {
                    this.setStyle(style);
                    info.update();
                });

                layer.on("click", onMapClick);
            },
        });
        map.addLayer(geojson);
    }
);

$(document).ready(function () {
    updateMap();

    $("#provinsi").on("change", function () {
        var prov = $(this).val();
        $("#kota").html(
            '<option value="">-- Sedang Mengambil Data --</option>'
        );
        $("#kota").load(
            Env.BASE_URL + "home/get_wilayah/" + prov,
            function (data) {}
        );
    });

    $('[name="status[]"]').change(function () {
        updateMap();
        table.ajax.reload(null, false);
    });
});
function newexportaction(e, dt, button, config) {
    var self = this;
    var oldStart = dt.settings()[0]._iDisplayStart;
    dt.one("preXhr", function (e, s, data) {
        data.start = 0;
        data.length = 2147483647;
        dt.one("preDraw", function (e, settings) {
            if (button[0].className.indexOf("buttons-copy") >= 0) {
                $.fn.dataTable.ext.buttons.copyHtml5.action.call(
                    self,
                    e,
                    dt,
                    button,
                    config
                );
            } else if (button[0].className.indexOf("buttons-excel") >= 0) {
                $.fn.dataTable.ext.buttons.excelHtml5.available(dt, config)
                    ? $.fn.dataTable.ext.buttons.excelHtml5.action.call(
                          self,
                          e,
                          dt,
                          button,
                          config
                      )
                    : $.fn.dataTable.ext.buttons.excelFlash.action.call(
                          self,
                          e,
                          dt,
                          button,
                          config
                      );
            } else if (button[0].className.indexOf("buttons-csv") >= 0) {
                $.fn.dataTable.ext.buttons.csvHtml5.available(dt, config)
                    ? $.fn.dataTable.ext.buttons.csvHtml5.action.call(
                          self,
                          e,
                          dt,
                          button,
                          config
                      )
                    : $.fn.dataTable.ext.buttons.csvFlash.action.call(
                          self,
                          e,
                          dt,
                          button,
                          config
                      );
            } else if (button[0].className.indexOf("buttons-pdf") >= 0) {
                $.fn.dataTable.ext.buttons.pdfHtml5.available(dt, config)
                    ? $.fn.dataTable.ext.buttons.pdfHtml5.action.call(
                          self,
                          e,
                          dt,
                          button,
                          config
                      )
                    : $.fn.dataTable.ext.buttons.pdfFlash.action.call(
                          self,
                          e,
                          dt,
                          button,
                          config
                      );
            } else if (button[0].className.indexOf("buttons-print") >= 0) {
                $.fn.dataTable.ext.buttons.print.action(e, dt, button, config);
            }
            dt.one("preXhr", function (e, s, data) {
                settings._iDisplayStart = oldStart;
                data.start = oldStart;
            });
            setTimeout(dt.ajax.reload, 0);
            return false;
        });
    });
    dt.ajax.reload();
}

// Tambahan data lainnya bisa juga ditampilkan di sini

// let image = feature.image;
// const images = image.map(function (image) {
//     const gambar =
//         "<img style='width: 100px; height: 100px;' src='http://127.0.0.1:8000/storage/images/" +
//         image.filename +
//         "'>";

//     return gambar;
// });
// markers.bindPopup(
//     "<h3> Halaman popup </h3>" +
//         "<p>Nama Kota : " +
//         feature.properties.name +
//         "</p>" +
//         "<p>Keterangan : " +
//         feature.properties.keterangan +
//         "</p>" +
//         "<p>Wilayah : " +
//         feature.properties.wilayah +
//         "</p>" +
//         "<p>" +
//         images.join(" ") +
//         "</p>"
// );

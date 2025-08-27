
// fungsi untuk menampilkan marker
function marker(markerurl, lat, long, imgurl, popuptext){
    var iconmarker = L.icon({
        iconUrl: markerurl,
        iconSize:     [36, 36], // size of the icon
        iconAnchor:   [18, 36], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -36] // point from which the popup should open relative to the iconAnchor
    });
    var popup = L.popup({
        maxwidhth: 200,
        closeonclick: false,
        autoClose: false,
    });
    popup.setlatlng([lat, long]);
    popup.setContent("<h3>"+popuptext+"</h3><img src='"+imgurl+"' width='100%'>");

    return l.marker([lat, long], {icon: iconmarker}).addTo(map).bindPopup(popup).closePopup();
}
// end fungsi marker

// tile layer
var openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, Attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'});

var googlesatellite = L.tileLayer('https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',{
    maxZoom: 20, Attribution: '&copy; <a href="https://www.google.com/intl/id_ID/help/terms_maps/">Google Maps</a>'});
// end tile layer

// set batas peta
var southWest = L.latLng(-6.997413878099785, 107.48566236167504),
    northEast = L.latLng(-6.833477087815589, 107.77611341177106),
    bounds = L.latLngBounds(southWest, northEast);
// end set batas peta

// inisialisasi peta
var map = L.map('map',{
    maxBounds: bounds,
    layers:[openStreetMap]
}).setView([-6.909281090224012, 107.59862848615857], 13);
// end inisialisasi peta

// fungsi untuk menampilkan popup saat klik peta
var popupOnMapClick = L.popup();
function onMapClick(e) {
    popupOnMapClick
        .setLatLng(e.latlng)
        .setContent("Titik Koordinat: " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);
// end fungsi popup klik peta

// layer control
var baseMaps = {
    "OpenStreetMap": openStreetMap,
    "Google Satellite": googlesatellite
};
L.control.layers(baseMaps).addTo(map);
// end layer control
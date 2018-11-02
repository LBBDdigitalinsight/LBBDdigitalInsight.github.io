var mymap = L.map('mapid').setView([51.505, -0.09], 13);

var geojsonLayer = new L.GeoJSON.AJAX("geojson/LondonWardsSPI.geojson");

var londonBoroughs = new L.GeoJSON.AJAX("geojson/LondonBoroughs.geojson");


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

L.geoJSON(geojsonLayer).addTo(map);

geojsonLayer.addTo(mymap);
londonBoroughs.addTo(mymap);

// creating the tile layer that will be the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// creating the dark view tile layer that will be an option for the map
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// creating a base layer to hold both maps
let baseMaps = { 
    Street: streets, 
    Dark: dark
};

// creating the map object with a center and zoom level

let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
});

// passing our map layers into layers control and adding the layers control to the map
L.control.layers(baseMaps).addTo(map);

// accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/CBrew913/mapping_earthquakes/main/majorAirports.json";

// grabbing the GeoJSON data
d3.json(airportData).then(function(data) {
    console.log(data);
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h2> Airport Code: " + feature.properties.faa + "</h2> <hr> <h3> Airport Name: " + feature.properties.name + "</h3>");
        }
    }).addTo(map);
});
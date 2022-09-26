// creating the tile layer that will be the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// creating the dark view tile layer that will be an option for the map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// creating a base layer to hold both maps
let baseMaps = { 
    "Streets": streets, 
    "Satellite Streets": satelliteStreets
};

// creating the map object with a center and zoom level

let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 10,
    layers: [satelliteStreets]
});

// passing our map layers into layers control and adding the layers control to the map
L.control.layers(baseMaps).addTo(map);

// accessing the Toronto neighborhoods GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/CBrew913/mapping_earthquakes/main/torontoNeighborhoods.json";

// creating a style for the lines
let myStyle = {
    color: "blue", 
    fillColor: "yellow",
    weight: 1
};

// grabbing the GeoJSON data
d3.json(torontoHoods).then(function(data) {
    console.log(data);
    L.geoJSON(data, {
        style: myStyle, 
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h2> Neighborhood: " + feature.features + "</h2>");
        }
    }).addTo(map);
});
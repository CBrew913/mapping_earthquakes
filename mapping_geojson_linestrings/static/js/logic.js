// creating the tile layer that will be the background of the map
let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// creating the dark view tile layer that will be an option for the map
let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// creating a base layer to hold both maps
let baseMaps = { 
    Night: night, 
    Day: day
};

// creating the map object with a center and zoom level

let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [night]
});

// passing our map layers into layers control and adding the layers control to the map
L.control.layers(baseMaps).addTo(map);

// accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/CBrew913/mapping_earthquakes/main/torontoRoutes.json";

// creating a style for the lines
let myStyle = {
    color: "khaki", 
    weight: 2
};

// grabbing the GeoJSON data
d3.json(torontoData).then(function(data) {
    console.log(data);
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h2> Airline: " + feature.properties.airline + "</h2> <hr> <h3> Destination: " + feature.properties.dst + "</h3>");
        }
    }).addTo(map);
});
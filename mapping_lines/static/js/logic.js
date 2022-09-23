// functionality test
console.log("working");

// creating the map object with a center and zoom level
let map = L.map('mapid').setView([40.7, -94.5], 4);

// coordinates for each point to be used in the line
let line = [
    // SFO
    [33.9416, -118.4085],
    // AUS
    [30.1900, -97.6664],
    // MCI
    [39.3006, -94.7125],
    // YYZ
    [43.6775, -79.6308],
    // JFK
    [40.6417, -73.7809]
];

// creating a polyline using the line coordinates
L.polyline(line, {
    color: "blue", 
    weight: 2, 
    dashArray: 4, 
    opacity: 0.5
}).addTo(map);

// creating the tile layer that will be the background of our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// adding a 'graymap' tile layer to the map
streets.addTo(map);
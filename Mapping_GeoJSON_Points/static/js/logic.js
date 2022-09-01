// add console.log to check to see if code is workgng
console.log("p")



// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// base layer holding both maps
let baseMaps = {
    Street: streets,
    Dark: dark
};

// create map object with a center and zoom level & default layer
let map = L.map("mapid", {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
});

// pass our map layers into our layer control and add the layer control to the map
L.control.layers(baseMaps).addTo(map);



//airport geoJSON 
let airportData = "https://raw.githubusercontent.com/arutledge9/Mapping_Earthquakes/main/majorAirports.json";

// grab GeoJSON data
d3.json(airportData).then(function(data) {
    console.log(data);
    //create GeoJSON layer with retrieved data
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng)
            .bindPopup("<h2>" + feature.properties.city + "<h3>" + "Airport Code: " + feature.properties.id + "<h3>" + "Airport Name: " + feature.properties.name);
        }  
    }).addTo(map);
});
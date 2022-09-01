// add console.log to check to see if code is workgng
console.log("p")



// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
    Light: light,
    Dark: dark
};

// create map object with a center and zoom level & default layer
let map = L.map("mapid", {
    center: [44, -80],
    zoom: 2,
    layers: [light]
});

// pass our map layers into our layer control and add the layer control to the map
L.control.layers(baseMaps).addTo(map);



//airport geoJSON 
let torontoData = "https://raw.githubusercontent.com/arutledge9/Mapping_Earthquakes/main/torontoRoutes.json";

// grab GeoJSON data
d3.json(torontoData).then(function(data) {
    console.log(data);
    //create GeoJSON layer with retrieved data
    L.geoJSON(data, {
        color: "yellow",
        weight: 2,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.airline + " says have a swell day in " + feature.properties.dst + ", traveler! </h3>");
        }
    }).addTo(map);
});
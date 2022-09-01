// add console.log to check to see if code is workgng
console.log("p")



// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// base layer holding both maps
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets,
};

// create map object with a center and zoom level & default layer
let map = L.map("mapid", {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets]
});

// pass our map layers into our layer control and add the layer control to the map
L.control.layers(baseMaps).addTo(map);



//airport geoJSON 
let torontoHoods = "https://raw.githubusercontent.com/arutledge9/Mapping_Earthquakes/main/torontoNeighborhoods.json";

let theStyle = {
    color: "blue",
    weight: 1,
    fillColor: "yellow"
};

// grab GeoJSON data
d3.json(torontoHoods).then(function(data) {
    console.log(data);
    //create GeoJSON layer with retrieved data
    L.geoJSON(data, {
        style: theStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.AREA_NAME + "</h3>");
        }
    })
    
    .addTo(map);
});
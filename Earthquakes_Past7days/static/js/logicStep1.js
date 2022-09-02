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
    "Satellite": satelliteStreets,
};

// create the earthquake layer for the map
let earthquakes = new L.layerGroup();

// define object that contains overlays
// this overlay will be visible all the time
let overlays = {
    Earthquakes: earthquakes
};

// create map object with a center and zoom level & default layer
let map = L.map("mapid", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// pass our map layers into our layer control and add the layer control to the map
L.control.layers(baseMaps, overlays).addTo(map);



//airport geoJSON 
let quake = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function styleInfo(feature) {
    return {
    opacity: 1,
    fillOpacity: 1,
    color: "#000000",
    weight: 0.5,
    stroke: true,
    radius: getRadius(feature.properties.mag),
    fillColor: getColor(feature.properties.mag)
    };
}

function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}

function getColor(magnitude) {
    if (magnitude > 5) {
        return "#ea2c2c";
    }
    if (magnitude > 4) {
        return "#ea822c";
    }
    if (magnitude > 3) {
        return "#ee9c00";
    } 
    if (magnitude > 2) {
        return "#eecc00";
    }
    if (magnitude > 1) {
        return "#d4ee00";
    }
    return "#98ea00";
}

// grab GeoJSON data
d3.json(quake).then(function(data) {
    //create GeoJSON layer with retrieved data
    L.geoJSON(data, {
        //turn each feature into a circleMarker on the map
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        // set the style for each circleMarker using styleInfo function
        style: styleInfo,
        // create a popup for each circleMarker to display the mag/loc 
        // of the quake after marker has been created and styled
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    })
    
    .addTo(earthquakes);
    earthquakes.addTo(map);
});

// create a legend control object
let legend = L.control({
    position: "bottomright"
});

// add on details for legend
legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");  // legend added to div element on index.html using DomUtil function
    const magnitudes = [0, 1, 2, 3, 4, 5]; // aka 'grades' array from Leaflet documentation
    const colors = [
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"
    ];
    // for loop will add color choices from colors array as a small box for the color of earthquakes
    // and place the text of the magnitiude range next to the box
    for (var i = 0; i < magnitudes.length; i++) {
        console.log(colors[i]);
        div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
};

legend.addTo(map);




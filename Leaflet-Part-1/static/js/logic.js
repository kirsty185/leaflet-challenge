//url : https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

// Perform an API call to the Earthquakes API to get the earthquake information. Call createMarkers when it completes.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);

function createMap(earthquakes) {
// Create the base layers.
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  
// Create a baseMaps object.
let baseMaps = {
  "Street Map": streetmap,
  // Leaflet - Part 2
  "Topographic Map": topo
 
};


// Create an overlayMaps object to hold the earthquake layer.
let overlayMaps = {
  "Earthquake": earthquakes
};

let map = L.map("map", {
  center: [20.5937, 78.9629],
  zoom: 3,
  layers: [streetmap, earthquakes]
});

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(map);

// Add the legend with colors to corrolate with depth
let info = L.control({position: "bottomright"});
info.onAdd = function() {
  let div = L.DomUtil.create("div", "legend"),
  depth = [-10, 10, 30, 50, 70, 90];

  div.innerHTML = "<h3 style='text-align: center'>Depth</h3>"

  for (let i = 0; i < depth.length; i++) {
    div.innerHTML +=
    '<i style="background-color:' + chooseColor(depth[i] + 1) + '"></i>' + depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
  }
  return div;
};

info.addTo(map);

}
// Function to determine marker color by depth
function chooseColor(depth){
  if (depth < 10) return "green";
  else if (depth < 30) return "greenyellow";
  else if (depth < 50) return "yellow";
  else if (depth < 70) return "orange";
  else if (depth < 90) return "orangered";
  else return "purple";
}


function createMarkers(response) {

  // Pull the "features" property from response.
  let features = response.features;

  // Initialize an array to hold earthquake markers.
  let earthquakeMarkers = [];

  // Loop through the features array.
  for (let i = 0; i < features.length; i++) {
   
    let feature = features[i];
    let lon = feature.geometry.coordinates[1];
    let lat = feature.geometry.coordinates[0];
    let depth = feature.geometry.coordinates[2];
    let mag = feature.properties.mag * 40000;
    
    let earthquakeMarker = L.circle([lon,lat], {
      fillOpacity: 0.75,
      color: "grey",
      fillColor: chooseColor(depth),
      radius: mag,
      weight: 1
    }).bindPopup("<h3>" + feature.properties.place + "<h3><h3>Magnitude: " + feature.properties.mag +"<h3><h3>Depth: " + depth + "</h3>");
  
    // Add the marker to the eartquakeMarkers array.
    earthquakeMarkers.push(earthquakeMarker);
  }
  // Create a layer group that's made from the earthquake markers array, and pass it to the createMap function.
  createMap(L.layerGroup(earthquakeMarkers));
}
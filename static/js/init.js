console.log("Loading webtest...");
const webtestResult = webtest();

if(!webtestResult) {
  console.error("Webtest failed! Response: " + webtestResult);
} else console.log("Webtest success!");

var mymap;

function updateLocation(e, map) {
  var radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(map)
    .bindPopup("Standort auf " + Math.round(radius*10)/10 + "m genau").openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

function initMap() {
  mymap = L.map('mapid').setView([50.104278, 8.675969], 13);

  L.tileLayer(TILE_URLS.default, {
    maxZoom: 18,
    attribution: 'Implementation: <a href="https://github.com/jens1o">jens1o</a> | Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(mymap);

  function onLocationError(e) {
    alert(e.message);
  }

  function setMarker(e){
      var lat = e.latlng.lat;
      var lng = e.latlng.lng;
       var marker = L.marker([lat, lng]).addTo(mymap);
       marker.bindPopup(lat + " " + lng).openPopup();
  }

  mymap.on('click', setMarker);
  mymap.on('locationfound', (e) => {updateLocation(e, mymap);});
  mymap.on('locationerror', onLocationError);

  mymap.locate({setView: true, maxZoom: 16});

navigator.geolocation.getCurrentPosition(position =>  {
  console.log(position);
  populateByTrashcans(position.coords.latitude, position.coords.longitude, mymap);
})
}

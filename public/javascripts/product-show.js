mapboxgl.accessToken = 'pk.eyJ1IjoibWFrdHBuIiwiYSI6ImNtaG5ybGIzMjAzMG8yaXNpOTBwZ3BxN3QifQ.zL-xsr61P461W4oGBf4TpQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: product.coordinates,
  zoom: 4
});

// create a HTML element for our post location/marker
var el = document.createElement('div');
el.className = 'marker';

// make a marker for our location and add to the map
new mapboxgl.Marker(el)
.setLngLat(product.coordinates)
.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
.setHTML('<h3>' + product.title + '</h3><p>' + product.location + '</p>'))
.addTo(map);

require('dotenv').config
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const { response } = require('./app');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN});


async function geocoder  (location) {
try{
    const response = await geocodingClient
.forwardGeocode({
  query: location ,
  limit: 1 ,

}) .send();

console.log(response.body.features[0].geometry.coordinates);

}catch(err){
    console.log (err);
}

}
geocoder('Manila, Philippines');

const NodeGeocoder = require('node-geocoder');

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: 'AIzaSyCKps5AWXn0f1da43ALOJY-ROV3b8lMpBA',
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;

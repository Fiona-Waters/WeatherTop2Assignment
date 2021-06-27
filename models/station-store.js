'use strict';

const stationList = require('./station-store.json').stationList;


const station = {
  
  name: stationList.name,
  lat: undefined,
  lng: undefined,
};


module.exports = stationList;


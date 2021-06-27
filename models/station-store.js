'use strict';

const stationList = require('./station-store.json').stationList;


const station = {
  
  name: stationList.name,
  lat: undefined,
  lng: undefined,
  
  station(name, lat, lng){
    this.name = name;
    this.lat = lat;
    this.lng = lng;
  }
};


module.exports = stationList;


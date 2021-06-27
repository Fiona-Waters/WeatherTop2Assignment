'use strict';

const stationList = require('./station-store.json').stationList;


const reading = {
  
  id: stationList.readings.id,
  code: stationList.readings.code,
  temperature: stationList.readings.temperature,
  windSpeed: stationList.readings.windSpeed,
  pressure: stationList.readings.pressure,
};


module.exports = stationList;
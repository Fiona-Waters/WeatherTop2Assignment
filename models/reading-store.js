'use strict';

const stationList = require('./station-store.json').stationList;

const reading = {
  
  code: undefined,
  temperature: undefined,
  windSpeed: undefined,
  pressure: undefined,
  
  reading(code,temperature,windSpeed,pressure){
    this.code = code;
    this.temperature = temperature;
    this.windSpeed = windSpeed;
    this.pressure = pressure;
  }
};



module.exports = stationList;
module.exports = reading;
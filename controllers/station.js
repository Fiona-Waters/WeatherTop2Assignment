'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');
const analytics = require('../utils/analytics.js');

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = " + stationId);
    const station = stationStore.getStation(stationId);
    
    if(station.readings.length>0){
        
      const lastReading = station.readings[station.readings.length-1];
      station.lastReading = lastReading;
           
      let celsius = lastReading.temperature;
      station.fahrenheit = analytics.convertCToF(celsius);
      let windSpeed = lastReading.windSpeed;
      station.beaufort = analytics.convertToBeaufort(windSpeed);
      let code = lastReading.code;
      station.weatherCondition = analytics.fillWeatherCodes(code);
      let windDirection = lastReading.windDirection;
      station.windCompass = analytics.calcWindDirection(windDirection);
      station.windChill = analytics.calcWindChill(lastReading.temperature,lastReading.windSpeed);
        
      }
    
    const viewData = {
      title: 'Station',
      station: station,
    };
    response.render('station', viewData);
  },
  
  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },
  
  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect('/station/' + stationId);
  },
};

module.exports = station;
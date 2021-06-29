"use strict";

const logger = require("../utils/logger");
const stationList = require("../models/station-store.js");
const analytics = require("../utils/analytics.js");


const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    
    for(let i = 0; i < stationList.length; i++) {
      const station = stationList[i];
      
      if(station.readings.length>0){
        
      const lastReading = station.readings[station.readings.length-1];
      station.lastReading = lastReading;
      
      stationList[i] = station;
        
      let celsius = lastReading.temperature;
      station.fahrenheit = analytics.convertCToF(celsius);
      let windSpeed = lastReading.windSpeed;
      station.beaufort = analytics.convertToBeaufort(windSpeed);
      let code = lastReading.code;
      station.weatherCondition = analytics.fillWeatherCodes(code);
      let windDirection = lastReading.windDirection;
      station.windCompass = analytics.calcWindDirection(windDirection);
        
      }
    }
      
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stationList
    };
    
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;

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
        
      let celsuis = lastReading.temperature;
      station.fahrenheit = analytics.convertCToF(celsuis);
      let windSpeed = lastReading.windSpeed;
      station.beaufort = analytics.convertToBeaufort(windSpeed);
      
      logger.info("fahrenheit: ", station.fahrenheit);
      logger.info("last reading :", lastReading);
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

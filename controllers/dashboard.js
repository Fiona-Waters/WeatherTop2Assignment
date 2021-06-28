"use strict";

const logger = require("../utils/logger");
const stationList = require("../models/station-store.js");




const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    
    for(let i = 0; i < stationList.length; i++) {
      const station = stationList[i];
      
      if(station.readings.length>0){
        
      const lastReading = station.readings[station.readings.length-1];
      station.lastReading = lastReading;
      
      stationList[i] = station;
        
      const celsuis = lastReading.temperature;
      station.fahrenheit = function convertCToF(celsius){
        return celsius * 9/5 + 32;
      }
    
      logger.info("last reading :", lastReading);
      }
    }
    
    
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stationList
    };
    //logger.info('about to render', stationList);
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;

"use strict";

const logger = require("../utils/logger");
const stationList = require("../models/station-store.js");

const setCardsForStation = function(station) {
  station.name = station.name + " Ciaran is Cool";
  return station;
}


const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    
    const newStationList = stationList.map(setCardsForStation);
    /*
    for(let i = 0; i < stationList.length; i++) {
      const station = stationList[i];
      logger.info('Station', station);
      
      const lastReading = station.readings.length-1;
    }
    */
    
    
    
    
    
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: newStationList
    };
    //logger.info('about to render', stationList);
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;

"use strict";

const logger = require("../utils/logger");
const stationList = require("../models/station-store.js");

const setCardsForStation = function(station) {
  logger.info("CardsFor", station);
}


const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    
    
    
    for(let i = 0; i < stationList.length; i++) {
      const station = stationList[i];
      logger.info('Station', station);
    }
    
    
    
    
    
    
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stationList
    };
    logger.info('about to render', stationList);
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;

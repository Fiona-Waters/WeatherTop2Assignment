'use strict';

const stationList = require('./station-store.json').stationList;

const analytics = {
  
const weatherCodes = {
  code:
  weather:
  
  
  
}
};

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stationList,
      weatherCodes: weatherCodes,
    };
    logger.info('about to render', stationList);
    response.render("dashboard", viewData);
  },
};
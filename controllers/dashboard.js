"use strict";

const logger = require("../utils/logger");
const stationList = require("../models/station-store.js");
const reading = require("../models/reading-store.js");
const weatherCodes = require("../utils/analytics.js");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stationList,
      readings: reading,
      weatherCodes: weatherCodes,
    };
    logger.info('about to render', stationList);
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;

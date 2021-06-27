"use strict";

const logger = require("../utils/logger");
const stations = require("../models/station-store.js");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "WeatherTop Dashboard",
      station: stations
    };
    logger.info('about to render', stations);
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;

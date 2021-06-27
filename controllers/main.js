"use strict";

const logger = require("../utils/logger");

const main = {
  index(request, response) {
    logger.info("about rendering");
    const viewData = {
      title: "About WeatherTop",
    };
    response.render("main", viewData);
  },
};

module.exports = main;
/**
 * About controller using index method to render about.html page
 *
 * @author Fiona Waters
 * @date 27.08.2021
 * @version 4
 */


"use strict";

const logger = require("../utils/logger");

const about = {
  index(request, response) {
    logger.info("about rendering");
    const viewData = {
      title: "About WeatherTop",
    };
    response.render("about", viewData);
  },
};

module.exports = about;

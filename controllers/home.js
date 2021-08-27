/**
 * Home controller using index method to render home page at start up
 *
 * @author Fiona Waters
 * @date 27.08.2021
 * @version 4
 */

"use strict";

const logger = require("../utils/logger");

const home = {
  index(request, response) {
    logger.info("home rendering");
    const viewData = {
      title: "Welcome"
    };
    response.render("home", viewData);
  }
};

module.exports = home;

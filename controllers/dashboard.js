"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const stationList = require('../models/station-store.js');
const analytics = require("../utils/analytics.js");
const uuid = require('uuid');


const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
      
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stationStore.getAllStations(),
    };
    logger.info("about to render", stationStore.getAllStations());
    response.render("dashboard", viewData);
  },
  
  addStation(request, response) {
    const newStation = {
      id: uuid.v1(),
      name: request.body.name,
      lat: request.body.lat,
      lng: request.body.lng,
      readings: [],
    };
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },
  
  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect('/dashboard');
  },
  
};

module.exports = dashboard;

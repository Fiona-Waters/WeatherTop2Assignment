"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const stationList = require('../models/station-store.js');
const analytics = require("../utils/analytics.js");
const uuid = require('uuid');
const accounts = require('./accounts.js');


const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const userStations = stationStore.getUserStations(loggedInUser.id);
    userStations.sort((a, b) => (a.name > b.name) ? 1 : -1);
    for (let i = 0; i < userStations.length; i++) {
        analytics.readingCalculations(userStations[i]);
    }

    const viewData = {
      title: "WeatherTop Dashboard",
      stations: userStations,
    };
    logger.info("about to render", viewData.stations);
    response.render("dashboard", viewData);
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      lat: request.body.lat,
      lng: request.body.lng,
      readings: [],
    };
    logger.debug('Creating a new Station', newStation);
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },
  
  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.info(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect('/dashboard');
  },
  
};

module.exports = dashboard;
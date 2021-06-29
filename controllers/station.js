'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = " + stationId);
    const viewData = {
      title: 'Station',
      station: stationStore.getStation(stationId),
    };
    response.render('station', viewData);
  },
};

module.exports = station;
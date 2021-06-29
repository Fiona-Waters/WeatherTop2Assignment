'use strict';

const logger = require('../utils/logger');
const stationList = require('../models/station-store.js');

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.info()
    const viewData = {
      title: 'Station',
    };
    response.render('station', viewData);
  },
};

module.exports = station;
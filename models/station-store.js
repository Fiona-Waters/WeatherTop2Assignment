'use strict';

const logger = require("../utils/logger");

const stations = {
  station: 'Tramore',
  readings: [
    {
      code: 800,
      temperature: 0.5,
      windSpeed: 3.5,
    },
    {
      code: 600,
      temperature: 6.0,
      windSpeed: 2.0,
    },
  ],
};

module.exports = stations;
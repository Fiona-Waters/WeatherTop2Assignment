'use strict';
const logger = require("../utils/logger");

const tramore = {
  name: 'Tramore',
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

const dunmore = {
  name: 'Dunmore',
  readings: [
    {
      code: 700,
      temperature: 8.0,
      windSpeed: 1.0
    },
    {
      code: 200,
      temperature: 0.5,
      windSpeed: 3.5,
    },
  ],
};

const stationList = [tramore, dunmore];


module.exports = stationList;
'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');
const analytics = require('../utils/analytics.js');
const axios = require('axios');


const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = " + stationId);
    const station = stationStore.getStation(stationId);
    analytics.readingCalculations(station);
    const viewData = {
      title: 'Station',
      station: stationStore.getStation(stationId)
    };
    response.render('station', viewData);
  },
  
  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const currentDate = new Date();
    const timestamp = new Date(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000)).toISOString().replace ('T', ' ').replace('Z', '');
    const newReading = {
      id: uuid.v1(),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
      date: timestamp,
    };
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },
  
  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect('/station/' + stationId);
  },
  
     async addreport(request, response) {
    logger.info("rendering new report");
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const currentDate = new Date();
    const timestamp = new Date(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000)).toISOString().replace ('T', ' ').replace('Z', '');
    let report = {};
    const oneCallRequest = `https://api.openweathermap.org/data/2.5/onecall?lat=${station.lat}&lon=${station.lng}&units=metric&appid=a5473e1c84ba16781dfe380fbabf11f2`
    const result = await axios.get(oneCallRequest);
    if (result.status == 200) {
      const reading = result.data.current;
      report.id = uuid.v1();
      report.code = reading.weather[0].id;
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;
      report.date = timestamp;
    }
    console.log(report);
    stationStore.addReading(stationId, report);
    response.redirect('/station/' + stationId);
  },
};

module.exports = station;
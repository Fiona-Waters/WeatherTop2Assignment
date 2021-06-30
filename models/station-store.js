const _ = require('lodash');

'use strict';

const stationStore = {

  stationList: require('./station-store.json').stationList,

  getAllStations() {
    return this.stationList;
  },

  getStation(id) {
    return _.find(this.stationList, { id: id });
    },
  
  removeReading(id, readingId) {
    const station = this.getStation(id);
    _.remove(station.readings, { id: readingId });
  },
  
  removeStation(id) {
    _.remove(this.stationList, { id: id });
  },
  
  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
  },
  
  addStation(station) {
  this.stationList.push(station);
},
};

module.exports = stationStore;
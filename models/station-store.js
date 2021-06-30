const _ = require('lodash');

'use strict';

const stationStore = {

  stationList: require('./station-store.json').stationList,

  getAllStations() {
    return this.stationList;
  },

  getStation(id) {
    return _.find(this.stationList, { id: id });
    }

    return foundStation;
  },
  removeReading(id, readingId) {
    const station = this.getStation(id);
    _.remove(station.readings, { id: readingId });
  },
};

module.exports = stationStore;


'use strict';

const stationStore = {

  stationList: require('./station-store.json').stationList,

  getAllStations() {
    return this.stationList;
  },

  getStation(id) {
    let foundStation = null;
    for (let station of this.stationList) {
      if (id == station.id) {
        foundStation = station;
      }
    }

    return foundStation;
  },
};

module.exports = stationStore;
const _ = require('lodash');
const JsonStore = require('./json-store');

'use strict';

const stationStore = {
  
  store: new JsonStore('./models/station-store.json', { stationList: [] }),
  //stationList: require('./station-store.json').stationList,
  collection: "StationList",

  getAllStations() {
    return this.store.findAll(this.collection);
  },

  getStation(id) {
return this.store.findOneBy(this.collection, { id: id });    },
  
  removeReading(id, readingId) {
    const station = this.getStation(id);
    _.remove(station.readings, { id: readingId });
  },
  
 removeStation(id) {
    const station = this.getStation(id);
    this.store.remove(this.collection, station);
    this.store.save();
  },
  
  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
  },
  
   addStation(station) {
    this.store.add(this.collection, station);
    this.store.save();
  },
  
  getUserStations(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = stationStore;
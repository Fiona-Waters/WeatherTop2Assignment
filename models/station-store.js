const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require("../utils/logger");

'use strict';

const stationStore = {
  
  store: new JsonStore('./models/station-store.json', { stationList: [] }),
  collection: "stationList",

  getAllStations() {
    return this.store.findAll(this.collection);
  },

  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  removeReading(id, readingId) {
    const station = this.getStation(id);
    const readings = station.readings;
    _.remove(readings, { id: readingId });
    this.store.save();
  },

  removeStation(id) {
    const station = this.getStation(id);
    this.store.remove(this.collection, station);
    this.store.save();
  },
  
  addReading(id, reading) {
    const station = this.getStation(id);
   // if(station.readings.length > 0) 
   { station.readings.push(reading);}
  },
  

  addStation(station) {
    this.store.add(this.collection, station);
    this.store.save();
  },
  
  getUserStations(userid){
    return this.store.findBy(this.collection, {userid: userid});
  },
};

module.exports = stationStore;
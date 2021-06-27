'use strict';

const stationList = require('./station-store.json').stationList;


const station = {
  public String name;
  public float lat;
  public float lng;
  public String weatherCondition;
  public String weatherConditionIcon;
  public float fahrenheit;
  public int toBeaufort;
  public String windCompass;
  public float windChill;
  public float minTemperature;
  public float maxTemperature;
  public float maxWindSpeed;
  public float minWindSpeed;
  public float maxPressure;
  public float minPressure;
  public String tempTrend;
  public String windTrend;
  public String pressureTrend;
}


module.exports = stationList;


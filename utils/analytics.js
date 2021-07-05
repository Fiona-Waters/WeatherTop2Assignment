'use strict';

const stationStore = require('../models/station-store.js');

const analytics = {
  
  convertCToF: function(celsius) {
    return celsius * 9/5 + 32;
  },
  
  convertToBeaufort: function(windSpeed){
    let beaufort = 0;
    if ((windSpeed > 1) && (windSpeed <= 5)) {
      beaufort = 1;
    } else if ((windSpeed > 5) && (windSpeed <= 11)) {
      beaufort = 2;
    } else if ((windSpeed > 11) && (windSpeed <= 19)) {
      beaufort = 3;
    } else if ((windSpeed > 19) && (windSpeed <= 28)) {
      beaufort = 4;
    } else if ((windSpeed > 28) && (windSpeed <= 38)) {
      beaufort = 5;
    } else if ((windSpeed > 38) && (windSpeed <= 49)) {
      beaufort = 6;
    } else if ((windSpeed > 49) && (windSpeed <= 61)) {
      beaufort = 7;
    } else if ((windSpeed > 61) && (windSpeed <= 74)) {
      beaufort = 8;
    } else if ((windSpeed > 74) && (windSpeed <= 88)) {
      beaufort = 9;
    } else if ((windSpeed > 88) && (windSpeed <= 102)) {
      beaufort = 10;
    } else if ((windSpeed > 102) && (windSpeed <= 117)) {
      beaufort = 11;
    }
    return beaufort;
  },
  
 fillWeatherCodes: function(code){
   let weatherCodes = new Map()
weatherCodes.set(100, "Clear")
weatherCodes.set(200, "Partial Clouds")
weatherCodes.set(300, "Cloudy")
weatherCodes.set(400, "Light Showers")
weatherCodes.set(500, "Heavy Showers")
weatherCodes.set(600, "Rain")
weatherCodes.set(700, "Snow")
weatherCodes.set(800, "Thunder")
   return weatherCodes.get(code);
 },
  
  fillIconWeatherCodes: function(code){
    let iconWeatherCodes = new Map()
    iconWeatherCodes.set(100, "yellow sun icon")
    iconWeatherCodes.set(200, "yellow cloud sun icon")
    iconWeatherCodes.set(300, "yellow cloud icon")
    iconWeatherCodes.set(400, "blue cloud rain icon")
    iconWeatherCodes.set(500, "grey cloud showers heavy icon")
    iconWeatherCodes.set(600, "grey cloud rain icon")
    iconWeatherCodes.set(700, "pink snowman icon")
    iconWeatherCodes.set(800, "yellow bolt icon")
    return iconWeatherCodes.get(code);
  },
  
  calcWindDirection: function(windDirection) {
    let compass = undefined;
    if (((windDirection >= 348.75) && (windDirection <= 360)) || (windDirection <= 11.25)) {
      compass = "North";
    } else if ((windDirection > 11.25) && (windDirection <= 33.75)) {
      compass = "North North East";
    } else if ((windDirection > 33.75) && (windDirection <= 56.25)) {
      compass = "North East";
    } else if ((windDirection > 56.25) && (windDirection <= 78.75)) {
      compass = "East North East";
    } else if ((windDirection > 78.75) && (windDirection <= 101.25)) {
      compass = "East";
    } else if ((windDirection > 101.25) && (windDirection <= 123.75)) {
      compass = "East South East";
    } else if ((windDirection > 123.75) && (windDirection <= 146.25)) {
      compass = "South East";
    } else if ((windDirection > 146.25) && (windDirection <= 168.75)) {
      compass = "South South East";
    } else if ((windDirection > 168.75) && (windDirection <= 191.25)) {
      compass = "South";
    } else if ((windDirection > 191.25) && (windDirection <= 213.75)) {
      compass = "South South West";
    } else if ((windDirection > 213.75) && (windDirection <= 236.25)) {
      compass = "South West";
    } else if ((windDirection > 236.25) && (windDirection <= 258.75)) {
      compass = "West South West";
    } else if ((windDirection > 258.75) && (windDirection <= 281.25)) {
      compass = "West";
    } else if ((windDirection > 281.25) && (windDirection <= 303.75)) {
      compass = "West North West";
    } else if ((windDirection > 303.75) && (windDirection <= 326.25)) {
      compass = "North West";
    } else if ((windDirection > 326.25) && (windDirection <= 348.75)) {
      compass = "North North West";
    }
    return compass;
  },
  
   calcWindChill: function(temperature, windSpeed) {
    let calc = Math.pow(windSpeed, 0.16);
    let a = 13.12;
    let b = 0.6215;
    let c = 11.37;
    let d = 0.3965;
    return (a + b * temperature - c * calc + d * temperature * calc).toPrecision(3);
  },
  
}


module.exports = analytics;
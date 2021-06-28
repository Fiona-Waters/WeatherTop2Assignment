'use strict';

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
 }
  
 

  
  
  
}





module.exports = analytics;
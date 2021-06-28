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
  
  fillWeatherCodes: function(){
   (100, "Clear");
    (200, "Partial clouds");
    weatherCodes.put(300, "Cloudy");
    weatherCodes.put(400, "Light Showers");
    weatherCodes.put(500, "Heavy Showers");
    weatherCodes.put(600, "Rain");
    weatherCodes.put(700, "Snow");
    weatherCodes.put(800, "Thunder");
  }

  
  
  
}
module.exports = analytics;
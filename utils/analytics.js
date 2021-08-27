/**
 * Analytics util handling data calculations and related methods.
 *
 * @author Fiona Waters
 * @date 27.08.2021
 * @version 4
 */

"use strict";

const stationStore = require("../models/station-store.js");

const analytics = {
  readingCalculations(station) {
    if (station.readings.length > 0) {
      const lastReading = station.readings[station.readings.length - 1];
      station.lastReading = lastReading;

      let celsius = lastReading.temperature;
      station.fahrenheit = analytics.convertCToF(celsius);
      let windSpeed = lastReading.windSpeed;
      station.beaufort = analytics.convertToBeaufort(windSpeed);
      let code = lastReading.code;
      station.weatherCondition = analytics.fillWeatherCodes(code);
      station.weatherConditionIcon = analytics.fillIconWeatherCodes(code);
      let windDirection = lastReading.windDirection;
      station.windCompass = analytics.calcWindDirection(windDirection);
      station.windChill = analytics.calcWindChill(
        lastReading.temperature,
        lastReading.windSpeed
      );
      station.minTemperature = analytics.calcMinimumTemperature(
        station.readings
      );
      station.maxTemperature = analytics.calcMaximumTemperature(
        station.readings
      );
      station.minWindSpeed = analytics.calcMinimumWindSpeed(station.readings);
      station.maxWindSpeed = analytics.calcMaximumWindSpeed(station.readings);
      station.minPressure = analytics.calcMinimumPressure(station.readings);
      station.maxPressure = analytics.calcMaximumPressure(station.readings);
      station.tempTrend = analytics.tempTrend(station.readings);
      station.windSpeedTrend = analytics.windSpeedTrend(station.readings);
      station.pressureTrend = analytics.pressureTrend(station.readings);
    }
  },

  convertCToF: function(celsius) {
    return (celsius * 9) / 5 + 32;
  },

  convertToBeaufort: function(windSpeed) {
    let beaufort = 0;
    if (windSpeed > 1 && windSpeed <= 5) {
      beaufort = 1;
    } else if (windSpeed > 5 && windSpeed <= 11) {
      beaufort = 2;
    } else if (windSpeed > 11 && windSpeed <= 19) {
      beaufort = 3;
    } else if (windSpeed > 19 && windSpeed <= 28) {
      beaufort = 4;
    } else if (windSpeed > 28 && windSpeed <= 38) {
      beaufort = 5;
    } else if (windSpeed > 38 && windSpeed <= 49) {
      beaufort = 6;
    } else if (windSpeed > 49 && windSpeed <= 61) {
      beaufort = 7;
    } else if (windSpeed > 61 && windSpeed <= 74) {
      beaufort = 8;
    } else if (windSpeed > 74 && windSpeed <= 88) {
      beaufort = 9;
    } else if (windSpeed > 88 && windSpeed <= 102) {
      beaufort = 10;
    } else if (windSpeed > 102 && windSpeed <= 117) {
      beaufort = 11;
    }
    return beaufort;
  },

  fillWeatherCodes: function(code) {
    let weatherCodes = new Map();

    weatherCodes.set(200, "Thunder");
    weatherCodes.set(201, "Thunder");
    weatherCodes.set(202, "Thunder");
    weatherCodes.set(210, "Thunder");
    weatherCodes.set(211, "Thunder");
    weatherCodes.set(212, "Thunder");
    weatherCodes.set(221, "Thunder");
    weatherCodes.set(230, "Thunder");
    weatherCodes.set(231, "Thunder");
    weatherCodes.set(232, "Thunder");
    weatherCodes.set(300, "Drizzle");
    weatherCodes.set(301, "Drizzle");
    weatherCodes.set(302, "Drizzle");
    weatherCodes.set(310, "Drizzle");
    weatherCodes.set(311, "Drizzle");
    weatherCodes.set(312, "Drizzle");
    weatherCodes.set(313, "Drizzle");
    weatherCodes.set(314, "Drizzle");
    weatherCodes.set(321, "Drizzle");
    weatherCodes.set(500, "Rain");
    weatherCodes.set(501, "Rain");
    weatherCodes.set(502, "Rain");
    weatherCodes.set(503, "Rain");
    weatherCodes.set(504, "Rain");
    weatherCodes.set(511, "Rain");
    weatherCodes.set(520, "Rain");
    weatherCodes.set(521, "Rain");
    weatherCodes.set(522, "Rain");
    weatherCodes.set(531, "Rain");

    weatherCodes.set(600, "Snow");
    weatherCodes.set(601, "Snow");
    weatherCodes.set(602, "Snow");
    weatherCodes.set(611, "Snow");
    weatherCodes.set(612, "Snow");
    weatherCodes.set(613, "Snow");
    weatherCodes.set(615, "Snow");
    weatherCodes.set(616, "Snow");
    weatherCodes.set(620, "Snow");
    weatherCodes.set(621, "Snow");
    weatherCodes.set(622, "Snow");

    weatherCodes.set(701, "Mist");
    weatherCodes.set(711, "Smoke");
    weatherCodes.set(721, "Haze");
    weatherCodes.set(731, "Dust");
    weatherCodes.set(741, "Fog");
    weatherCodes.set(751, "Sand");
    weatherCodes.set(761, "Dust");
    weatherCodes.set(762, "Ash");
    weatherCodes.set(771, "Squall");
    weatherCodes.set(781, "Tornado");

    weatherCodes.set(800, "Clear");
    weatherCodes.set(801, "Clouds");
    weatherCodes.set(802, "Clouds");
    weatherCodes.set(803, "Clouds");
    weatherCodes.set(804, "Clouds");

    return weatherCodes.get(code);
  },

  fillIconWeatherCodes: function(code) {
    let iconWeatherCodes = new Map();

    iconWeatherCodes.set(200, "yellow bolt icon");
    iconWeatherCodes.set(201, "yellow bolt icon");
    iconWeatherCodes.set(202, "yellow bolt icon");
    iconWeatherCodes.set(210, "yellow bolt icon");
    iconWeatherCodes.set(211, "yellow bolt icon");
    iconWeatherCodes.set(212, "yellow bolt icon");
    iconWeatherCodes.set(221, "yellow bolt icon");
    iconWeatherCodes.set(230, "yellow bolt icon");
    iconWeatherCodes.set(231, "yellow bolt icon");
    iconWeatherCodes.set(232, "yellow bolt icon");

    iconWeatherCodes.set(300, "blue cloud rain icon");
    iconWeatherCodes.set(301, "blue cloud rain icon");
    iconWeatherCodes.set(302, "blue cloud rain icon");
    iconWeatherCodes.set(310, "blue cloud rain icon");
    iconWeatherCodes.set(311, "blue cloud rain icon");
    iconWeatherCodes.set(312, "blue cloud rain icon");
    iconWeatherCodes.set(313, "blue cloud rain icon");
    iconWeatherCodes.set(314, "blue cloud rain icon");
    iconWeatherCodes.set(321, "blue cloud rain icon");

    iconWeatherCodes.set(500, "grey cloud showers heavy icon");
    iconWeatherCodes.set(501, "grey cloud showers heavy icon");
    iconWeatherCodes.set(502, "grey cloud showers heavy icon");
    iconWeatherCodes.set(503, "grey cloud showers heavy icon");
    iconWeatherCodes.set(504, "grey cloud showers heavy icon");
    iconWeatherCodes.set(511, "grey cloud showers heavy icon");
    iconWeatherCodes.set(520, "grey cloud showers heavy icon");
    iconWeatherCodes.set(521, "grey cloud showers heavy icon");
    iconWeatherCodes.set(522, "grey cloud showers heavy icon");
    iconWeatherCodes.set(531, "grey cloud showers heavy icon");

    iconWeatherCodes.set(600, "pink snowman icon");
    iconWeatherCodes.set(601, "pink snowman icon");
    iconWeatherCodes.set(602, "pink snowman icon");
    iconWeatherCodes.set(611, "pink snowman icon");
    iconWeatherCodes.set(612, "pink snowman icon");
    iconWeatherCodes.set(613, "pink snowman icon");
    iconWeatherCodes.set(615, "pink snowman icon");
    iconWeatherCodes.set(616, "pink snowman icon");
    iconWeatherCodes.set(620, "pink snowman icon");
    iconWeatherCodes.set(621, "pink snowman icon");
    iconWeatherCodes.set(622, "pink snowman icon");

    iconWeatherCodes.set(701, "grey smog icon");
    iconWeatherCodes.set(711, "grey smog icon");
    iconWeatherCodes.set(721, "grey smog icon");
    iconWeatherCodes.set(731, "grey smog icon");
    iconWeatherCodes.set(741, "grey smog icon");
    iconWeatherCodes.set(751, "grey smog icon");
    iconWeatherCodes.set(761, "grey smog icon");
    iconWeatherCodes.set(762, "grey smog icon");
    iconWeatherCodes.set(771, "grey smog icon");
    iconWeatherCodes.set(781, "grey smog icon");

    iconWeatherCodes.set(800, "yellow sun icon");
    iconWeatherCodes.set(801, "yellow cloud icon");
    iconWeatherCodes.set(802, "yellow cloud icon");
    iconWeatherCodes.set(803, "yellow cloud icon");
    iconWeatherCodes.set(804, "yellow cloud icon");

    return iconWeatherCodes.get(code);
  },

  calcWindDirection: function(windDirection) {
    let compass = undefined;
    if (
      (windDirection >= 348.75 && windDirection <= 360) ||
      windDirection <= 11.25
    ) {
      compass = "North";
    } else if (windDirection > 11.25 && windDirection <= 33.75) {
      compass = "North North East";
    } else if (windDirection > 33.75 && windDirection <= 56.25) {
      compass = "North East";
    } else if (windDirection > 56.25 && windDirection <= 78.75) {
      compass = "East North East";
    } else if (windDirection > 78.75 && windDirection <= 101.25) {
      compass = "East";
    } else if (windDirection > 101.25 && windDirection <= 123.75) {
      compass = "East South East";
    } else if (windDirection > 123.75 && windDirection <= 146.25) {
      compass = "South East";
    } else if (windDirection > 146.25 && windDirection <= 168.75) {
      compass = "South South East";
    } else if (windDirection > 168.75 && windDirection <= 191.25) {
      compass = "South";
    } else if (windDirection > 191.25 && windDirection <= 213.75) {
      compass = "South South West";
    } else if (windDirection > 213.75 && windDirection <= 236.25) {
      compass = "South West";
    } else if (windDirection > 236.25 && windDirection <= 258.75) {
      compass = "West South West";
    } else if (windDirection > 258.75 && windDirection <= 281.25) {
      compass = "West";
    } else if (windDirection > 281.25 && windDirection <= 303.75) {
      compass = "West North West";
    } else if (windDirection > 303.75 && windDirection <= 326.25) {
      compass = "North West";
    } else if (windDirection > 326.25 && windDirection <= 348.75) {
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
    return (
      a +
      b * temperature -
      c * calc +
      d * temperature * calc
    ).toPrecision(3);
  },

  calcMinimumTemperature: function(readings) {
    let minValue = 0;
    if (readings.length > 0) {
      minValue = readings[0].temperature;
      for (let i = 0; i < readings.length; i++) {
        if (readings[i].temperature < minValue) {
          minValue = readings[i].temperature;
        }
      }
    }
    return minValue;
  },

  calcMaximumTemperature: function(readings) {
    let maxValue = 0;
    if (readings.length > 0) {
      maxValue = readings[0].temperature;
      for (let i = 0; i < readings.length; i++) {
        if (readings[i].temperature > maxValue) {
          maxValue = readings[i].temperature;
        }
      }
    }
    return maxValue;
  },

  calcMinimumWindSpeed: function(readings) {
    let minValue = 0;
    if (readings.length > 0) {
      minValue = readings[0].windSpeed;
      for (let i = 0; i < readings.length; i++) {
        if (readings[i].windSpeed < minValue) {
          minValue = readings[i].windSpeed;
        }
      }
    }
    return minValue;
  },

  calcMaximumWindSpeed: function(readings) {
    let maxValue = 0;
    if (readings.length > 0) {
      maxValue = readings[0].windSpeed;
      for (let i = 0; i < readings.length; i++) {
        if (readings[i].windSpeed > maxValue) {
          maxValue = readings[i].windSpeed;
        }
      }
    }
    return maxValue;
  },

  calcMinimumPressure: function(readings) {
    let minValue = 0;
    if (readings.length > 0) {
      minValue = readings[0].pressure;
      for (let i = 0; i < readings.length; i++) {
        if (readings[i].pressure < minValue) {
          minValue = readings[i].pressure;
        }
      }
    }
    return minValue;
  },

  calcMaximumPressure: function(readings) {
    let maxValue = 0;
    if (readings.length > 0) {
      maxValue = readings[0].pressure;
      for (let i = 0; i < readings.length; i++) {
        if (readings[i].pressure > maxValue) {
          maxValue = readings[i].pressure;
        }
      }
    }
    return maxValue;
  },

  tempTrend: function(readings) {
    let result = "";
    if (readings.length >= 3) {
      let lastReading = readings[readings.length - 1].temperature;
      let secondLastReading = readings[readings.length - 2].temperature;
      let thirdLastReading = readings[readings.length - 3].temperature;

      if (
        lastReading > secondLastReading &&
        secondLastReading > thirdLastReading
      ) {
        result = "arrow up";
      } else if (
        lastReading < secondLastReading &&
        secondLastReading < thirdLastReading
      ) {
        result = "arrow down";
      } else {
        result = "Steady";
      }
    }
    return result;
  },

  windSpeedTrend: function(readings) {
    let result = "";
    if (readings.length >= 3) {
      let lastReading = readings[readings.length - 1].windSpeed;
      let secondLastReading = readings[readings.length - 2].windSpeed;
      let thirdLastReading = readings[readings.length - 3].windSpeed;

      if (
        lastReading > secondLastReading &&
        secondLastReading > thirdLastReading
      ) {
        result = "arrow up";
      } else if (
        lastReading < secondLastReading &&
        secondLastReading < thirdLastReading
      ) {
        result = "arrow down";
      } else {
        result = "Steady";
      }
    }
    return result;
  },
  pressureTrend: function(readings) {
    let result = "";
    if (readings.length >= 3) {
      let lastReading = readings[readings.length - 1].pressure;
      let secondLastReading = readings[readings.length - 2].pressure;
      let thirdLastReading = readings[readings.length - 3].pressure;

      if (
        lastReading > secondLastReading &&
        secondLastReading > thirdLastReading
      ) {
        result = "arrow up";
      } else if (
        lastReading < secondLastReading &&
        secondLastReading < thirdLastReading
      ) {
        result = "arrow down";
      } else {
        result = "Steady";
      }
    }
    return result;
  }
};

module.exports = analytics;

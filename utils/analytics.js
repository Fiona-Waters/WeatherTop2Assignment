'use strict';

//const stationList = require('./station-store.json').stationList;

const analytics = {
  fillWeatherCodes(request, response){
const weatherCodes = {
  100: "Clear",
  200: "Partial clouds",
  300: "Cloudy",
  400: "Light Showers",
  500: "Heavy Showers",
  600: "Rain",
  700: "Snow",
  800: "Thunder"
} 
response.render("dashboard", weatherCodes);
}
};

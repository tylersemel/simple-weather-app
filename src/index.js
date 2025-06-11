import "./styles.css";
import { WeatherManager } from "./weather";
// import { DomManager } from "./dom";
if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

console.log("I'm working!");

// const weatherForecast =
//   await WeatherManager.getWeatherForecastFromLocation("North Carolina");

// console.log(weatherForecast.currentUnit);
// weatherForecast.toggleUnits();
// console.log(weatherForecast.currentUnit);
// // DomManager.setWeatherSpan();
// console.log(weatherForecast);

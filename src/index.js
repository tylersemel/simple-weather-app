import "./styles.css";
import { WeatherManager } from "./weather";
import { DomManager } from "./dom-manager.js";
if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

console.log("I'm working!");

const forecast =
  await WeatherManager.getWeatherForecastFromLocation("North Carolina");

const currentWeather = await forecast.currentWeather;

DomManager.init(currentWeather, forecast);

console.log(forecast);

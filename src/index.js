import "./styles.css";
import { Controller } from "./controller.js";

const controller = new Controller();

const forecast = await controller.createWeatherForecast(
  "San Diego, California",
);
console.log(forecast);

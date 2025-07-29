import "./styles.css";
import { Controller } from "./controller.js";

const controller = new Controller();

// const forecast = await controller.createWeatherForecast(
//   "San Diego, California",
// );

controller.init("Cary, North Carolina");

// console.log(controller);

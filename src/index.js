import "./styles.css";
import { ForecastController } from "./controller.js";
import { ForecastView } from "./weather-view.js";

class App {
  constructor() {
    this.view = new ForecastView();
    this.controller = new ForecastController(null, this.view);
  }
}

const app = new App();
await app.controller.init("Cary, North Carolina");

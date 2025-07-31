import { WeatherForecast } from "./weather";

export class ForecastController {
  constructor(model, view) {
    this.setModel(model);
    this.view = view;
    this.view.setController(this);
  }

  async init(location) {
    const model = await WeatherForecast.create(location);

    if (!model) {
      return;
    }

    this.setModel(model);
    this.updateView(model);
  }

  setModel(model) {
    this.model = model;
  }

  updateView(model) {
    this.view.init();
    this.view.render(model);
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.view.locationSearchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const location = new FormData(e.target).get("location");
      this.handleSearch(location);
    });

    this.view.fahrenheitBtn.addEventListener("click", () =>
      this.handleToggleUnits(),
    );

    this.view.celsiusBtn.addEventListener("click", () =>
      this.handleToggleUnits(),
    );
  }

  async handleSearch(location) {
    const model = await WeatherForecast.create(location);
    this.setModel(model);
    this.updateView(model);
  }

  handleToggleUnits() {
    this.model.toggleUnits();

    this.updateView(this.model);
  }
}

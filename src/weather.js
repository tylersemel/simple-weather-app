/**
 * **Purpose**: Manage application data and business rules

  **Responsibilities**:
  - Define data structures
  - Implement business logic
  - Validate data integrity
  - Provide data transformation methods
  - Handle data persistence
 */

class Moonphase {
  constructor(moon) {
    this.setMoonphase(moon);
  }

  setMoonphase(amount) {
    let product = (amount - 0.5) * 100;

    if (amount <= 0.5) {
      product = (amount + 0.5) * 100;
    }

    product = product.toFixed(0);
    this.percentageUntilFull = String(product) + "%";

    if (amount == 0) {
      this.phase = "new-moon";
    } else if (amount > 0 && amount < 0.25) {
      this.phase = "waxing-crescent";
    } else if (amount == 0.25) {
      this.phase = "first-quarter";
    } else if (amount > 0.25 && amount < 0.5) {
      this.phase = "waxing-gibbous";
    } else if (amount == 0.5) {
      this.phase = "full-moon";
    } else if (amount > 0.5 && amount < 0.75) {
      this.phase = "waning-gibbous";
    } else if (amount == 0.75) {
      this.phase = "third-quarter";
    } else {
      this.phase = "waning-crescent";
    }
  }
}

class AbstractWeather {
  constructor(data) {
    if (this.constructor == AbstractWeather) {
      throw new Error(
        "Cannot instantiate abstract class AbstractWeather directly.",
      );
    }

    this.feelsLike = data.feelsLike;
    this.temp = data.temp;
    this.conditions = data.conditions; //short description
    this.icon = data.icon;
    this.precipitation = data.precipitation;
    this.humidity = data.humidity;
    this.wind = data.wind;
    this.moon = new Moonphase(data.moon);
    this.sunrise = data.sunrise;
    this.sunset = data.sunset;
    this.uvindex = data.uvindex;
  }
}

//The current conditions
class CurrentWeather extends AbstractWeather {
  constructor(data) {
    super(data);
    this.dateTime = data.dateTime; //like 2PM
  }
}

//The weather for the day
class DailyWeather extends AbstractWeather {
  constructor(data) {
    super(data);
    this.date = data.date;
    this.description = data.description;
    this.tempMin = data.tempMin;
    this.tempMax = data.tempMax;
  }
}

class WeatherForecast {
  UNITS = ["F", "C"];

  constructor(currentWeather, days, description, location) {
    this.currentWeather = currentWeather;
    this.days = days;
    this.description = description; //weekly description
    this.location = location;
    this.unit = this.UNITS[0];
  }

  toggleUnits() {
    this.unit = this.unit == this.UNITS[0] ? this.UNITS[1] : this.UNITS[0];
  }
}

export { WeatherForecast, CurrentWeather, DailyWeather };

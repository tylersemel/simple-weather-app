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
  phase = "";
  percentageUntilFull = "";

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
      this.phase = "New Moon";
    } else if (amount > 0 && amount < 0.25) {
      this.phase = "Waxing Crescent";
    } else if (amount == 0.25) {
      this.phase = "First Quarter";
    } else if (amount > 0.25 && amount < 0.5) {
      this.phase = "Waxing Gibbous";
    } else if (amount == 0.5) {
      this.phase = "Full Moon";
    } else if (amount > 0.5 && amount < 0.75) {
      this.phase = "Waning Gibbous";
    } else if (amount == 0.75) {
      this.phase = "Last Quarter";
    } else {
      this.phase = "Waning Crescent";
    }
  }
}

//for each day and the basic info about current weather
export class Weather {
  feelsLike = 0;
  temp = 0;
  tempMin = 0;
  tempMax = 0;
  conditions = ""; //short description
  icon = "";
  precipitation = 0;
  humidity = 0;
  wind = 0;
  date = "";
  dateTime = "";
  description = ""; // long description for overall day

  constructor(
    feelsLike,
    temp,
    tempMin,
    tempMax,
    conditions,
    icon,
    precipitation,
    humidity,
    wind,
    moon,
    date,
    dateTime,
    description,
  ) {
    this.feelsLike = feelsLike;
    this.temp = temp;
    this.tempMin = tempMin;
    this.tempMax = tempMax;
    this.conditions = conditions;
    this.icon = icon;
    this.precipitation = precipitation;
    this.humidity = humidity;
    this.wind = wind;
    this.moon = new Moonphase(moon);
    this.date = date;
    this.dateTime = dateTime; //like 2PM
    this.description = description;
  }
}

export class WeatherForecast {
  days = [];
  location = "";
  currentWeather;
  description = "Look ahead";
  UNITS = ["F", "C"];
  currentUnit = this.UNITS[0];

  constructor(currentWeather, days, description, location) {
    this.currentWeather = currentWeather;
    this.days = days;
    this.description = description; //weekly description
    this.location = location;
  }

  toggleUnits() {
    this.currentUnit =
      this.currentUnit == this.UNITS[0] ? this.UNITS[1] : this.UNITS[0];
  }
}

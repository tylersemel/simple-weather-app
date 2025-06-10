export const WeatherManager = (() => {
  class Moonphase {
    phase = "";
    percentageUntilFull = "";

    constructor(moon) {
      this.setMoonphase(moon);
    }

    setMoonphase(amount) {
      if (amount <= 0.5) {
        let product = (amount + 0.5) * 100;
        product = product.toFixed(0);
        this.percentageUntilFull = String(product) + "%";
      } else {
        let product = (amount - 0.5) * 100;
        product = product.toFixed(0);
        this.percentageUntilFull = String(product) + "%";
      }

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

  class Weather {
    temp = 0;
    minTemp = 0;
    maxTemp = 0;
    conditions = "";
    icon = "";
    precipitation = 0;
    humidity = 0;
    wind = 0;
    date = "";

    constructor(
      temp,
      minTemp,
      maxTemp,
      conditions,
      icon,
      precipitation,
      humidity,
      wind,
      moon,
      date,
    ) {
      this.temp = temp;
      this.minTemp = minTemp;
      this.maxTemp = maxTemp;
      this.conditions = conditions;
      this.icon = icon;
      this.precipitation = precipitation;
      this.humidity = humidity;
      this.wind = wind;
      this.moon = new Moonphase(moon);
      this.date = date;
    }
  }

  class WeatherForecast {
    days = [];
    location = "";
    currentWeather;
    UNITS = ["F", "C"];
    currentUnit = this.UNITS[0];

    constructor(currentWeather, days, location) {
      this.days = days;
      this.location = location;
      this.currentWeather = currentWeather;
    }

    toggleUnits() {
      this.currentUnit =
        this.currentUnit == this.UNITS[0] ? this.UNITS[1] : this.UNITS[0];
    }
  }

  const NEXT_DAYS = 7;

  async function getWeatherForecastFromLocation(location) {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=98L2K2WD536Q949XYA4B3W424`,
    );

    const data = await response.json();

    return createWeatherForecast(data);
  }

  function createWeatherForecast(data) {
    try {
      let days = [];
      let currentWeather = new Weather(
        data.currentConditions.temp,
        data.currentConditions.minTemp,
        data.currentConditions.maxTemp,
        data.currentConditions.conditions,
        data.currentConditionsicon,
        data.currentConditions.precipitation,
        data.currentConditions.humidity,
        data.currentConditions.windspeed,
        data.currentConditions.moonphase,
        "Current Day",
      );

      if (data.days.length >= NEXT_DAYS) {
        for (let i = 0; i < NEXT_DAYS; i++) {
          let weather = new Weather(
            data.days[i].temp,
            data.days[i].minTemp,
            data.days[i].maxTemp,
            data.days[i].conditions,
            data.days[i].icon,
            data.days[i].precipitation,
            data.days[i].humidity,
            data.days[i].windspeed,
            data.days[i].moonphase,
            data.days[i].datetime,
          );

          days.push(weather);
        }
      }

      return new WeatherForecast(currentWeather, days, data.address);
    } catch (err) {
      console.error(err);
    }
  }

  return { getWeatherForecastFromLocation };
})();

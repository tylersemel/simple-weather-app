export const WeatherManager = (() => {
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
  class Weather {
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

  class WeatherForecast {
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

  const NEXT_DAYS = 7;

  async function getWeatherForecastFromLocation(location) {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=98L2K2WD536Q949XYA4B3W424`,
    );

    const data = await response.json();
    console.log(data);

    return createWeatherForecast(data);
  }

  function createWeatherForecast(data) {
    try {
      let days = [];
      //current weather wont have a max or min
      let currentWeather = new Weather(
        data.currentConditions.feelslike,
        data.currentConditions.temp,
        data.currentConditions.temp,
        data.currentConditions.temp,
        data.currentConditions.conditions,
        data.currentConditions.icon,
        data.currentConditions.precip,
        data.currentConditions.humidity,
        data.currentConditions.windspeed,
        data.currentConditions.moonphase,
        "Current Day",
        data.currentConditions.dateTime,
        data.days[0].description,
      );

      if (data.days.length >= NEXT_DAYS) {
        for (let i = 0; i < NEXT_DAYS; i++) {
          let weather = new Weather(
            data.days[i].feelslike,
            data.days[i].temp,
            data.days[i].tempmin,
            data.days[i].tempmax,
            data.days[i].conditions,
            data.days[i].icon,
            data.days[i].precip,
            data.days[i].humidity,
            data.days[i].windspeed,
            data.days[i].moonphase,
            data.days[i].datetime,
            "",
            data.days[i].description,
          );

          days.push(weather);
        }
      }

      return new WeatherForecast(
        currentWeather,
        days,
        data.description,
        data.address,
      );
    } catch (err) {
      console.error(err);
    }
  }

  return { getWeatherForecastFromLocation };
})();

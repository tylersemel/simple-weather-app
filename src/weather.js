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
    this.description = description;
    this.location = location;
    this.unit = this.UNITS[0];
  }

  convertToCelsius(f) {
    return (f - 32) / 1.8;
  }

  convertToFahrenheit(c) {
    return c * 1.8 + 32;
  }

  toggleUnits() {
    this.unit = this.unit == this.UNITS[0] ? this.UNITS[1] : this.UNITS[0];

    const convertTemp =
      this.unit == this.UNITS[1]
        ? this.convertToCelsius.bind(this)
        : this.convertToFahrenheit.bind(this);

    this.currentWeather.temp = convertTemp(this.currentWeather.temp);
    this.currentWeather.feelsLike = convertTemp(this.currentWeather.feelsLike);
    this.days.forEach((day) => {
      day.temp = convertTemp(day.temp);
      day.tempMin = convertTemp(day.tempMin);
      day.tempMax = convertTemp(day.tempMax);
    });
  }

  static async create(location) {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=98L2K2WD536Q949XYA4B3W424`,
    );

    const data = await response.json();
    console.log(data);

    try {
      const NEXT_DAYS = 7;
      let days = [];
      const currentWeatherData = data.currentConditions;

      let currentWeather = new CurrentWeather({
        feelsLike: currentWeatherData.feelslike,
        temp: currentWeatherData.temp,
        conditions: currentWeatherData.conditions,
        icon: currentWeatherData.icon,
        precipitation: currentWeatherData.precip,
        humidity: currentWeatherData.humidity,
        wind: currentWeatherData.windspeed,
        moon: currentWeatherData.moonphase,
        dateTime: currentWeatherData.datetime,
        sunrise: currentWeatherData.sunrise,
        sunset: currentWeatherData.sunset,
        uvindex: currentWeatherData.uvindex,
      });

      if (data.days.length >= NEXT_DAYS) {
        for (let i = 0; i < NEXT_DAYS; i++) {
          let dayIdxData = data.days[i];

          let weather = new DailyWeather({
            feelsLike: dayIdxData.feelslike,
            temp: dayIdxData.temp,
            tempMin: dayIdxData.tempmin,
            tempMax: dayIdxData.tempmax,
            conditions: dayIdxData.conditions,
            icon: dayIdxData.icon,
            precipitation: dayIdxData.precip,
            humidity: dayIdxData.humidity,
            wind: dayIdxData.windspeed,
            moon: dayIdxData.moonphase,
            date: dayIdxData.datetime,
            description: dayIdxData.description,
            sunrise: dayIdxData.sunrise,
            sunset: dayIdxData.sunset,
            uvindex: dayIdxData.uvindex,
          });

          days.push(weather);
        }
      }

      return new WeatherForecast(
        currentWeather,
        days,
        data.description,
        data.resolvedAddress,
      );
    } catch (err) {
      console.error(err);
    }
  }
}

export { WeatherForecast, CurrentWeather, DailyWeather };

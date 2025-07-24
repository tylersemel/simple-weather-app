/*
**Purpose**: Coordinate between Models and Views

**Responsibilities**:
- Handle user input
- Implement application logic
- Update models based on user actions
- Update views when data changes
- Manage application flow
*/
import { WeatherForecast, CurrentWeather, DailyWeather } from "./weather.js";
import { WeatherView } from "./view";

export class Controller {
  constructor() {
    this.view = new WeatherView();
  }

  async createWeatherForecast(location) {
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
          });

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
}

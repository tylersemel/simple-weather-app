import "./styles.css";
import { WeatherForecast, Weather } from "./weather.js";

window.myfunc = async function createWeatherForecast(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=98L2K2WD536Q949XYA4B3W424`,
  );

  const data = await response.json();

  try {
    const NEXT_DAYS = 7;
    let days = [];
    const currentWeatherData = data.currentConditions;
    //current weather wont have a max or min
    let currentWeather = new Weather(
      currentWeatherData.feelslike,
      currentWeatherData.temp,
      currentWeatherData.temp,
      currentWeatherData.temp,
      currentWeatherData.conditions,
      currentWeatherData.icon,
      currentWeatherData.precip,
      currentWeatherData.humidity,
      currentWeatherData.windspeed,
      currentWeatherData.moonphase,
      "Current Day",
      currentWeatherData.dateTime,
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
};

// const forecast = await createWeatherForecast("San Diego, California");
// console.log(forecast);

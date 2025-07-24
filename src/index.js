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
    let curWeatherObj = {
      feelsLike: currentWeatherData.feelslike,
      temp: currentWeatherData.temp,
      tempMin: null,
      tempMax: null,
      conditions: currentWeatherData.conditions,
      icon: currentWeatherData.icon,
      precipitation: currentWeatherData.precip,
      humidity: currentWeatherData.humidity,
      wind: currentWeatherData.windspeed,
      moon: currentWeatherData.moonphase,
      date: "Current Day",
      dateTime: currentWeatherData.datetime,
      description: data.days[0].description,
    };

    let currentWeather = new Weather(curWeatherObj);

    if (data.days.length >= NEXT_DAYS) {
      for (let i = 0; i < NEXT_DAYS; i++) {
        let dayIdxData = data.days[i];

        let dataObj = {
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
          dateTime: null,
          description: dayIdxData.description,
        };

        let weather = new Weather(dataObj);

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

import { Dom } from "./dom.js";

export const DomManager = (() => {
  function init(currentWeather, forecast) {
    Dom.setTodaysWeatherCard(
      currentWeather.date,
      forecast.days[0].tempMin,
      forecast.days[0].tempMax,
      currentWeather.description,
      forecast.currentUnit,
    );

    Dom.setCurrentWeatherCard(
      currentWeather.dateTime,
      currentWeather.temp,
      currentWeather.feelsLike,
      currentWeather.conditions,
      currentWeather.precipitation,
      currentWeather.humidity,
      currentWeather.wind,
      forecast.currentUnit,
    );

    Dom.setHeaderElements(forecast.location);

    Dom.setLookAheadCard(forecast.description);

    Dom.setMoonphaseCard(
      currentWeather.moon.phase,
      currentWeather.moon.percentageUntilFull,
    );
  }

  return { init };
})();

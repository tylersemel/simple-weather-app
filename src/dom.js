export const Dom = (() => {
  //grab all DOM elements that should already be in the HTML
  const rootContainer = document.querySelector(".root.container");
  const headerElement = rootContainer.querySelector(".header");
  const mainContainer = rootContainer.querySelector(".main-container");

  function setHeaderElements(location) {
    const currentLocationElement =
      headerElement.querySelector(".current-location");
    currentLocationElement.textContent = location;
  }

  function setTodaysWeatherCard(date, tempMin, tempMax, description, unit) {
    //getting the elements of the card that need to be filled with current weather data
    const todayCard = mainContainer.querySelector(".card.today");
    const dateTimeElement = todayCard.querySelector(".date");
    const loElement = todayCard.querySelector(".lo-degree");
    const hiElement = todayCard.querySelector(".hi-degree");
    const descriptionElement = todayCard.querySelector(".description");

    //some of these things need to be changed to fit a format
    dateTimeElement.textContent = date;
    loElement.textContent = tempMin + "°" + unit;
    hiElement.textContent = tempMax + "°" + unit;
    descriptionElement.textContent = description;
  }

  function setCurrentWeatherCard(
    dateTime,
    temp,
    feelsLike,
    conditions,
    precipitation,
    humidity,
    wind,
    unit,
  ) {
    const currentWeatherCard = mainContainer.querySelector(
      ".card.current-weather",
    );
    const dateTimeElement = currentWeatherCard.querySelector(".time");
    const tempElement = currentWeatherCard.querySelector(".current-degrees");
    const feelsLikeElement = currentWeatherCard.querySelector(".feels-like");
    const conditionsElement = currentWeatherCard.querySelector(".conditions");
    const precipElement = currentWeatherCard.querySelector(".precipitation");
    const humidityElement = currentWeatherCard.querySelector(".humidity");
    const windElement = currentWeatherCard.querySelector(".windspeed");

    dateTimeElement.textContent = dateTime;
    tempElement.textContent = temp + "°";
    feelsLikeElement.textContent = feelsLike + "°" + unit;
    conditionsElement.textContent = conditions;
    precipElement.textContent = precipitation + "%";
    humidityElement.textContent = humidity + "%";
    windElement.textContent = wind + " MPH";
  }

  function setLookAheadCard(description) {
    const lookAheadCard = mainContainer.querySelector(".card.look-ahead");
    const descriptionElement = lookAheadCard.querySelector(
      ".look-ahead-description",
    );

    descriptionElement.textContent = description;
  }

  function setMoonphaseCard(phase, percentageUnilFull) {
    const moonphaseCard = mainContainer.querySelector(".card.moon");
    const phaseElement = moonphaseCard.querySelector(".moonphase");
    const percentageElement = moonphaseCard.querySelector(".percentage");

    phaseElement.textContent = phase;
    percentageElement.textContent = percentageUnilFull;
  }

  return {
    setHeaderElements,
    setTodaysWeatherCard,
    setCurrentWeatherCard,
    setLookAheadCard,
    setMoonphaseCard,
  };
})();

//need to have way to grab DOM element
//append new info to DOM element
//OR
//create a new DOM element and append that

export const DomManager = (() => {
  const weatherSpan = document.querySelector(".weather span");

  function setWeatherSpan(weather) {
    weatherSpan.textContent = weather;
  }

  return { setWeatherSpan };
})();

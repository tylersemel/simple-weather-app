import { parse, format } from "date-fns";

export class ForecastView {
  constructor() {
    this.rootContainer = document.querySelector(".root.container");
    this.header = this.rootContainer.querySelector(".header");
    this.mainContainer = this.rootContainer.querySelector(".main-container");

    this.init();
  }

  //may not need
  setController(controller) {
    if (!this.controller) {
      this.controller = controller;
    }
  }

  init() {
    this.mainContainer.innerHTML = "";

    this.weatherCardsMain = this.createMain();
    this.mainContainer.appendChild(this.weatherCardsMain);
    this.createCards();

    this.locationSearchForm = this.rootContainer.querySelector(
      ".location-search form",
    );
    this.locationSearchFormP = this.locationSearchForm.querySelector("p");
    this.locationError = this.header.querySelector("#location-error");

    this.fahrenheitBtn = this.weatherCardsMain.querySelector("#fahrenheit");
    this.celsiusBtn = this.weatherCardsMain.querySelector("#celsius");

    this.removeLocationError();
  }

  //main
  createMain() {
    const weatherCardsMain = document.createElement("main");
    weatherCardsMain.className = "weather-cards";

    const leftCardsDiv = document.createElement("div");
    leftCardsDiv.className = "left-cards";

    const rightCardsDiv = document.createElement("div");
    rightCardsDiv.className = "right-cards";

    weatherCardsMain.appendChild(leftCardsDiv);
    weatherCardsMain.appendChild(rightCardsDiv);

    return weatherCardsMain;
  }

  //creating each individual card
  createCards() {
    this.leftCards = [];

    this.leftCards.push({ title: "today", card: this.createTodayCard() });
    this.leftCards.push({
      title: "currentWeather",
      card: this.createCurrentWeatherCard(),
    });
    this.leftCards.push({ title: "sun", card: this.createSunCard() });
    this.leftCards.push({ title: "moon", card: this.createMoonCard() });
    this.leftCards.push({
      title: "lookAhead",
      card: this.createLookAheadCard(),
    });

    this.rightCards = [];
    this.rightCards.push({
      title: "forecast",
      card: this.createForecastCard(),
    });

    for (let i = 0; i < this.leftCards.length; i++) {
      this.weatherCardsMain
        .querySelector(".left-cards")
        .appendChild(this.leftCards[i].card);
    }

    for (let i = 0; i < this.rightCards.length; i++) {
      this.weatherCardsMain
        .querySelector(".right-cards")
        .appendChild(this.rightCards[i].card);
    }
  }

  //the basic bones of all the cards
  createCard(subheaderHtml, cardBodyHtml, cardClass) {
    const card = document.createElement("div");
    card.className = "card";

    const subheader = document.createElement("div");
    subheader.className = "subheader";

    const hr = document.createElement("hr");

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    card.appendChild(subheader);
    card.appendChild(hr);
    card.appendChild(cardBody);

    subheader.innerHTML = subheaderHtml;
    cardBody.innerHTML = cardBodyHtml;

    card.classList.add(cardClass);

    return card;
  }

  createTodayCard() {
    const todayHeader = `<span>TODAY'S WEATHER</span>
        <span class="date"></span>`;

    const todayBody = `<div class="lo-hi-temps">
        <div class="temp lo">
          <span>🌡️</span>
          <span>Lo:</span>
          <span class="lo-degree"></span>
        </div>
        <div class="temp hi">
          <span>🌡️</span>
          <span>Hi:</span>
          <span class="hi-degree"></span>
        </div>
      </div>
      <div class="description">
        <span></span>
      </div>`;

    const todayCard = this.createCard(todayHeader, todayBody, "today");

    return todayCard;
  }

  createCurrentWeatherCard() {
    const curWeatherHeader = `<span>CURRENT WEATHER</span>
                <span class="time">2:03PM</span>`;

    const curWeatherBody = `<div class="card-left">
                  <div class="card-left-top">
                    <img/>
                    <div class="current-degree-feel">
                      <div class="degree">
                        <span class="current-degrees">89°</span>
                        <div class="f-or-c">
                          <button id="fahrenheit">F</button>
                          <div class="vertical-break"></div>
                          <button id="celsius">C</button>
                        </div>
                      </div>
                      <div class="feels-like-container">
                        <span>Feels like</span>
                        <span class="feels-like">92°</span>
                      </div>
                    </div>
                  </div>
                  <div class="card-left-bottom">
                    <span class="conditions">Sunny</span>
                  </div>
                </div>
                <div class="card-right">
                  <div class="precip-info">
                    <span>Precipitation</span>
                    <span class="precipitation">0%</span>
                  </div>
                  <hr />
                  <div class="humidity-info">
                    <span>Humidity</span>
                    <span class="humidity">70%</span>
                  </div>
                  <hr />
                  <div class="wind-info">
                    <span>Wind</span>
                    <span class="windspeed">4mph</span>
                  </div>
                </div>`;

    const currentWeatherCard = this.createCard(
      curWeatherHeader,
      curWeatherBody,
      "current-weather",
    );

    return currentWeatherCard;
  }

  createSunCard() {
    const sunSubheader = `<span>SUN</span>`;
    const sunBody = `<div class="card-left">
                  <div class="icon"></div>
                  <span>UV Index:</span>
                  <span class="uv">13%</span>
                </div>
                <div class="card-right">
                  <div class="rise">
                    <span>Rise: </span>
                    <span class="sunrise">5:59AM</span>
                  </div>
                  <div class="set">
                    <span>Set: </span>
                    <span class="sunset">8:31PM</span>
                  </div>
                </div>`;

    const sunCard = this.createCard(sunSubheader, sunBody, "sun");

    return sunCard;
  }

  createMoonCard() {
    const moonSubheader = `<span>MOONPHASE</span>`;
    const moonBody = `<div class="card-left">
                  <div class="icon"></div>
                  <span class="moonphase">Waxing Gibbous</span>
                </div>
                <div class="card-right">
                  <span>Until full moon:</span>
                  <span class="percentage">97.5%</span>
                </div>
              </div>`;

    const moonCard = this.createCard(moonSubheader, moonBody, "moon");

    return moonCard;
  }

  createLookAheadCard() {
    const subheader = `<span>LOOK AHEAD</span>`;
    const body = `<span class="look-ahead-description"
                  >There will be storms a brewing these next few days, so get
                  ready, get under, and get going. It's gonna be a bumpy
                  ride.</span>`;
    const lookAheadCard = this.createCard(subheader, body, "look-ahead");

    return lookAheadCard;
  }

  createForecastCard() {
    const subheader = `<span>7-DAY WEATHER FORECAST</span>`;
    let body = ``;
    for (let i = 0; i < 7; i++) {
      body += this.#createForecastDay();

      if (i != 6) {
        body += `<hr />`;
      }
    }

    const forecastCard = this.createCard(subheader, body, "forecast");

    return forecastCard;
  }

  #createForecastDay() {
    const day = `<div class="day">
                  <div class="date">
                    <span class="week-day"></span>
                    <span class="month-day"></span>
                  </div>
                  <div class="icon"></div>
                  <div class="hi-lo-temp">
                    <span class="hi"></span>
                    <div class="space">|</div>
                    <span class="lo"></span>
                  </div>
                  
                  <div class="description"></div>
                  <div class="precipitation">
                    <img/>
                    <span></span>
                  </div>
                </div>`;
    return day;
  }

  render(weatherForecast) {
    this.renderHeader(weatherForecast.location);
    this.renderTodayCard(weatherForecast);
    this.renderCurrentWeatherCard(weatherForecast);
    this.renderSunCard(weatherForecast.currentWeather);
    this.renderMoonphaseCard(weatherForecast.currentWeather.moon);
    this.renderLookAheadCard(weatherForecast.description);
    this.renderForecastCard(weatherForecast.days);
    this.setupCss(weatherForecast);
  }

  renderHeader(location) {
    const currentLocationElement =
      this.header.querySelector(".current-location");
    currentLocationElement.textContent = location;
  }

  renderTodayCard(weatherForecast) {
    const todayCard = this.weatherCardsMain.querySelector(".card.today");

    const dateTime = todayCard.querySelector(".date");
    const lo = todayCard.querySelector(".lo-degree");
    const hi = todayCard.querySelector(".hi-degree");
    const description = todayCard.querySelector(".description");

    let date = parse(weatherForecast.days[0].date, "yyyy-MM-dd", new Date());

    dateTime.textContent = format(date, "eee, MMM dd");

    lo.textContent =
      weatherForecast.days[0].tempMin.toFixed(0) + "°" + weatherForecast.unit;
    hi.textContent =
      weatherForecast.days[0].tempMax.toFixed(0) + "°" + weatherForecast.unit;
    description.textContent = weatherForecast.description;
  }

  removeHyphensAndCapitalize(str) {
    return str.replace(/-([a-z])/g, function (match, char) {
      return " " + char.toUpperCase();
    });
  }

  async renderCurrentWeatherCard(weatherForecast) {
    const currentWeatherCard = this.weatherCardsMain.querySelector(
      ".card.current-weather",
    );

    const icon = currentWeatherCard.querySelector("img");
    icon.className = "icon";

    const dateTimeElement = currentWeatherCard.querySelector(".time");
    const tempElement = currentWeatherCard.querySelector(".current-degrees");
    const feelsLikeElement = currentWeatherCard.querySelector(".feels-like");
    const conditionsElement = currentWeatherCard.querySelector(".conditions");
    const precipElement = currentWeatherCard.querySelector(".precipitation");
    const humidityElement = currentWeatherCard.querySelector(".humidity");
    const windElement = currentWeatherCard.querySelector(".windspeed");

    let date = new Date();

    let iconStr = weatherForecast.currentWeather.icon;
    let svgModule = await import(`./assets/SVG/${iconStr}.svg`);

    icon.src = svgModule.default;
    icon.alt = "Weather icon";
    dateTimeElement.textContent = format(date, "h:mm aa");
    tempElement.textContent =
      weatherForecast.currentWeather.temp.toFixed(0) + "°";
    feelsLikeElement.textContent =
      weatherForecast.currentWeather.feelsLike.toFixed(0) +
      "°" +
      weatherForecast.unit;
    conditionsElement.textContent = weatherForecast.currentWeather.conditions;
    precipElement.textContent =
      weatherForecast.currentWeather.precipitation.toFixed(0) + "%";
    humidityElement.textContent =
      weatherForecast.currentWeather.humidity.toFixed(0) + "%";
    windElement.textContent = weatherForecast.currentWeather.wind + " MPH";
  }

  renderSunCard(currentWeather) {
    const sunCard = this.weatherCardsMain.querySelector(".card.sun");
    const uvRadiation = sunCard.querySelector(".uv");
    const sunrise = sunCard.querySelector(".sunrise");
    const sunset = sunCard.querySelector(".sunset");

    uvRadiation.textContent = currentWeather.uvindex;

    let sunriseTime = parse(
      currentWeather.sunrise.split(":", 2).join(":"),
      "HH:mm",
      new Date(),
    );

    sunrise.textContent = format(sunriseTime, "h:mm a");

    let sunsetTime = parse(
      currentWeather.sunset.split(":", 2).join(":"),
      "HH:mm",
      new Date(),
    );

    sunset.textContent = format(sunsetTime, "h:mm a");
  }

  async renderMoonphaseCard(moon) {
    const moonphaseCard = this.weatherCardsMain.querySelector(".card.moon");
    const phaseElement = moonphaseCard.querySelector(".moonphase");
    const percentageElement = moonphaseCard.querySelector(".percentage");
    const icon = moonphaseCard.querySelector(".icon");
    const iconImg = new Image();

    let moonphasesModule = await import(
      `./assets/moonphases/${moon.phase}.png`
    );

    iconImg.src = moonphasesModule.default;
    iconImg.className = "moon-img";
    icon.appendChild(iconImg);
    let str = moon.phase[0].toUpperCase();
    str += moon.phase.substr(1, moon.phase.length);
    phaseElement.textContent = this.removeHyphensAndCapitalize(str);
    percentageElement.textContent = moon.percentageUntilFull;
  }

  renderLookAheadCard(description) {
    const lookAheadCard =
      this.weatherCardsMain.querySelector(".card.look-ahead");
    const descriptionElement = lookAheadCard.querySelector(
      ".look-ahead-description",
    );

    descriptionElement.textContent = description;
  }

  async renderForecastCard(days) {
    const forecastCard = this.weatherCardsMain.querySelector(".card.forecast");
    const nodeList = forecastCard.querySelectorAll(".day");
    const dayDivs = Array.from(nodeList);
    const raindrop = await import("./assets/SVG/raindrop-drop-svgrepo-com.svg");

    for (let i = 0; i < days.length; i++) {
      let weekDay = dayDivs[i].querySelector(".week-day");
      let monthDay = dayDivs[i].querySelector(".month-day");
      let hi = dayDivs[i].querySelector(".hi");
      let lo = dayDivs[i].querySelector(".lo");
      let description = dayDivs[i].querySelector(".description");
      let precipitation = dayDivs[i].querySelector(".precipitation span");

      hi.textContent = days[i].tempMax.toFixed(0) + "°";
      lo.textContent = days[i].tempMin.toFixed(0) + "°";
      description.textContent = days[i].conditions;

      let raindropImg = dayDivs[i].querySelector(".precipitation img");
      raindropImg.src = raindrop.default;
      raindropImg.alt = "A raindrop";
      precipitation.textContent =
        (days[i].precipitation * 100).toFixed(0) + "%";

      const icon = dayDivs[i].querySelector(".icon");
      const iconImg = new Image();
      let svgModule = await import(`./assets/SVG/${days[i].icon}.svg`);
      iconImg.src = svgModule.default;
      iconImg.className = "day-img";
      iconImg.alt = "Icon";
      icon.appendChild(iconImg);

      let date = parse(days[i].date, "yyyy-MM-dd", new Date());
      weekDay.textContent = format(date, "eee");

      monthDay.textContent = format(date, "M/dd");
    }
  }

  disableButton(button) {
    //disable button and change color to gray
    button.style.color = "black";
    button.style.cursor = "default";
    button.disabled = true;
  }

  enableButton(button) {
    button.style.color = "gray";
    button.style.cursor = "pointer";
    button.disabled = false;
  }

  //some css depends on the model's data
  setupCss(weatherForecast) {
    const toEnable =
      weatherForecast.unit == weatherForecast.UNITS[0]
        ? this.celsiusBtn
        : this.fahrenheitBtn;

    const toDisable =
      toEnable == this.fahrenheitBtn ? this.celsiusBtn : this.fahrenheitBtn;

    this.enableButton(toEnable);
    this.disableButton(toDisable);

    this.locationSearchForm.querySelector("#location").value = "";
  }

  removeLocationError() {
    this.locationSearchFormP.classList.remove("error");
    this.locationError.classList.remove("error");
  }

  addLocationError() {
    this.locationSearchFormP.classList.add("error");
    this.locationError.classList.add("error");
  }
}

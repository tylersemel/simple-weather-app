/**
 *  **Purpose**: Handle all visual representation and DOM manipulation

    **Responsibilities**:
    - Create and update DOM elements
    - Apply CSS classes and styles
    - Handle animations
    - Bind DOM events
    - Expose methods for updating display
 */

//main page
export class WeatherView {
  constructor(container) {
    console.log("here");
    this.container = container;
    this.header = this.container.querySelector(".header");
    this.mainContainer = this.container.querySelector(".main-container");

    this.weatherCardsMain = this.createMain();
    this.mainContainer.appendChild(this.weatherCardsMain);
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
                  <div class="precipitation"></div>
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
  }

  renderHeader(location) {
    const currentLocationElement =
      this.header.querySelector(".current-location");
    currentLocationElement.textContent = location;
  }

  renderTodayCard(weatherForecast) {
    //getting the elements of the card that need to be filled with current weather data
    // const todayItem = this.leftCards.find((item) => item.title == "today");
    // const todayCard = todayItem.card;

    const todayCard = this.weatherCardsMain.querySelector(".card.today");

    const dateTime = todayCard.querySelector(".date");
    const lo = todayCard.querySelector(".lo-degree");
    const hi = todayCard.querySelector(".hi-degree");
    const description = todayCard.querySelector(".description");

    dateTime.textContent = weatherForecast.days[0].date; //need to convert
    lo.textContent =
      weatherForecast.days[0].tempMin + "°" + weatherForecast.unit;
    hi.textContent =
      weatherForecast.days[0].tempMax + "°" + weatherForecast.unit;
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

    let iconStr = weatherForecast.currentWeather.icon;
    let svgModule = await import(`./assets/SVG/${iconStr}.svg`);

    icon.src = svgModule.default;
    icon.alt = "Weather icon";
    dateTimeElement.textContent = weatherForecast.currentWeather.dateTime;
    tempElement.textContent = weatherForecast.currentWeather.temp + "°";
    feelsLikeElement.textContent =
      weatherForecast.currentWeather.feelsLike + "°" + weatherForecast.unit;
    conditionsElement.textContent = weatherForecast.currentWeather.conditions;
    precipElement.textContent =
      weatherForecast.currentWeather.precipitation + "%";
    humidityElement.textContent = weatherForecast.currentWeather.humidity + "%";
    windElement.textContent = weatherForecast.currentWeather.wind + " MPH";
  }

  renderSunCard(currentWeather) {
    const sunCard = this.weatherCardsMain.querySelector(".card.sun");
    const uvRadiation = sunCard.querySelector(".uv");
    const sunrise = sunCard.querySelector(".sunrise");
    const sunset = sunCard.querySelector(".sunset");

    uvRadiation.textContent = currentWeather.uvindex;
    sunrise.textContent = currentWeather.sunrise + " a.m.";
    sunset.textContent = currentWeather.sunset + " p.m.";
  }

  async renderMoonphaseCard(moon) {
    const moonphaseCard = this.weatherCardsMain.querySelector(".card.moon");
    const phaseElement = moonphaseCard.querySelector(".moonphase");
    const percentageElement = moonphaseCard.querySelector(".percentage");
    const icon = moonphaseCard.querySelector(".icon");
    // const iconStr = m
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

    for (let i = 0; i < days.length; i++) {
      let weekDay = dayDivs[i].querySelector(".week-day");
      let monthDay = dayDivs[i].querySelector(".month-day");
      let hi = dayDivs[i].querySelector(".hi");
      let lo = dayDivs[i].querySelector(".lo");
      let description = dayDivs[i].querySelector(".description");
      let precipitation = dayDivs[i].querySelector(".precipitation");

      weekDay.textContent = "MON";
      monthDay.textContent = days[i].date;
      hi.textContent = days[i].tempMax;
      lo.textContent = days[i].tempMin;
      description.textContent = days[i].description;
      precipitation.textContent = "💧" + days[i].precipitation + "%";

      const icon = dayDivs[i].querySelector(".icon");
      const iconImg = new Image();

      let svgModule = await import(`./assets/SVG/${days[i].icon}.svg`);

      iconImg.src = svgModule.default;
      iconImg.className = "day-img";
      iconImg.alt = "Icon";
      icon.appendChild(iconImg);
    }
  }
}

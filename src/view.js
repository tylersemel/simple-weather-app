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

    this.createCards();
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

    console.log(this.leftCards[0]);

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
        <span class="date">WED, JUN 11</span>`;

    const todayBody = `<div class="lo-hi-temps">
        <div class="temp lo">
          <!-- Icon space here -->
          <div class="icon"></div>
          <span>Lo:</span>
          <span class="lo-degree">12°F</span>
        </div>
        <div class="temp hi">
          <div class="icon"></div>
          <span>Hi:</span>
          <span class="hi-degree">56°F</span>
        </div>
      </div>
      <div class="description">
        <span>
          Partly cloudy throughout the day with early morning rain.
        </span>
      </div>`;

    const todayCard = this.createCard(todayHeader, todayBody, "today");

    return todayCard;
  }

  createCurrentWeatherCard() {
    const curWeatherHeader = `<span>CURRENT WEATHER</span>
                <span class="time">2:03PM</span>`;

    const curWeatherBody = `<div class="card-left">
                  <div class="card-left-top">
                    <div class="icon"></div>
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
                  <span>UV Radiation: 13%</span>
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
      body += this.createForecastDay();

      if (i != 6) {
        body += `<hr />`;
      }
    }

    const forecastCard = this.createCard(subheader, body, "forecast");

    return forecastCard;
  }

  createForecastDay() {
    const day = `<div class="day">
                  <div class="date">
                    <span class="week-day"></span>
                    <span class="month-day"></span>
                  </div>
                  <div class="hi-lo-temp">
                    <span class="hi"></span>
                    <div class="space"></div>
                    <span class="lo"></span>
                  </div>
                  <div class="icon"></div>
                  <div class="description"></div>
                  <div class="precipitation"></div>
                </div>`;
    return day;
  }

  render(weatherForecast) {
    this.renderHeader(weatherForecast.location);
    this.renderCards(weatherForecast);
  }

  renderHeader(location) {
    const currentLocationElement =
      this.header.querySelector(".current-location");
    currentLocationElement.textContent = location;
  }

  // renderCards(weatherForecast) {
  //   renderTodayCard(weatherForecast);
  // }

  // renderTodayCard(weatherForecast) {}

  // function setTodaysWeatherCard(date, tempMin, tempMax, description, unit) {
  //   //getting the elements of the card that need to be filled with current weather data
  //   const todayCard = mainContainer.querySelector(".card.today");
  //   const dateTimeElement = todayCard.querySelector(".date");
  //   const loElement = todayCard.querySelector(".lo-degree");
  //   const hiElement = todayCard.querySelector(".hi-degree");
  //   const descriptionElement = todayCard.querySelector(".description");

  //   //some of these things need to be changed to fit a format
  //   dateTimeElement.textContent = date;
  //   loElement.textContent = tempMin + "°" + unit;
  //   hiElement.textContent = tempMax + "°" + unit;
  //   descriptionElement.textContent = description;
  // }

  // function setCurrentWeatherCard(
  //   dateTime,
  //   temp,
  //   feelsLike,
  //   conditions,
  //   precipitation,
  //   humidity,
  //   wind,
  //   unit,
  // ) {
  //   const currentWeatherCard = mainContainer.querySelector(
  //     ".card.current-weather",
  //   );
  //   const dateTimeElement = currentWeatherCard.querySelector(".time");
  //   const tempElement = currentWeatherCard.querySelector(".current-degrees");
  //   const feelsLikeElement = currentWeatherCard.querySelector(".feels-like");
  //   const conditionsElement = currentWeatherCard.querySelector(".conditions");
  //   const precipElement = currentWeatherCard.querySelector(".precipitation");
  //   const humidityElement = currentWeatherCard.querySelector(".humidity");
  //   const windElement = currentWeatherCard.querySelector(".windspeed");

  //   dateTimeElement.textContent = dateTime;
  //   tempElement.textContent = temp + "°";
  //   feelsLikeElement.textContent = feelsLike + "°" + unit;
  //   conditionsElement.textContent = conditions;
  //   precipElement.textContent = precipitation + "%";
  //   humidityElement.textContent = humidity + "%";
  //   windElement.textContent = wind + " MPH";
  // }

  // function setLookAheadCard(description) {
  //   const lookAheadCard = mainContainer.querySelector(".card.look-ahead");
  //   const descriptionElement = lookAheadCard.querySelector(
  //     ".look-ahead-description",
  //   );

  //   descriptionElement.textContent = description;
  // }

  // function setMoonphaseCard(phase, percentageUnilFull) {
  //   const moonphaseCard = mainContainer.querySelector(".card.moon");
  //   const phaseElement = moonphaseCard.querySelector(".moonphase");
  //   const percentageElement = moonphaseCard.querySelector(".percentage");

  //   phaseElement.textContent = phase;
  //   percentageElement.textContent = percentageUnilFull;
  // }
}

//Show input: search city name, weather today, wind, humidity
function showInput(response) {
  city = response.data.name;
  if (units === "metric") {
    document.querySelector("#temp-1").innerHTML = `${Math.round(
      response.data.main.temp
    )}°C`;
  } else {
    document.querySelector("#temp-1").innerHTML = `${Math.round(
      response.data.main.temp
    )}°F`;
  }
  document.querySelector("#humidity-1").innerHTML = response.data.main.humidity;
  document.querySelector("#location").innerHTML = response.data.name;
  if (units === "metric") {
    document.querySelector("#wind-1").innerHTML = `${Math.round(
      response.data.wind.speed * 3.6
    )} km/h`;
  } else {
    document.querySelector("#wind-1").innerHTML = `${Math.round(
      response.data.wind.speed
    )} mph`;
  }
  document
    .querySelector("#icon-1")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

//Show Forecast
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = ("0" + date.getHours()).substr(-2);
  let minutes = ("0" + date.getMinutes()).substr(-2);
  return `${hours}:${minutes}`;
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  let displayTempUnit = "";
  let displayWindUnit = "";
  if (units === "metric") {
    displayTempUnit = "C";
    displayWindUnit = "km/h";
  } else {
    displayTempUnit = "F";
    displayWindUnit = "mph";
  }

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += ` 
  <div class="col-sm-2">
    <div class="overview-date">
       <h5 class="date_title">${formatHours(forecast.dt * 1000)}</h5>
       <img src="http://openweathermap.org/img/wn/${
         forecast.weather[0].icon
       }@2x.png"/>
      <h4 class="temperature"><span id="forecast-temp">${Math.round(
        forecast.main.temp
      )}</span>°${displayTempUnit}</h4>
      <ul>
      <li class="wind">Wind: <span>${Math.round(
        forecast.wind.speed * 3.6
      )}</span> ${displayWindUnit}</li>
      <li class="humidity">Humidity: <span>${Math.round(
        forecast.main.humidity
      )}</span>%</li>
      </ul>
    </div>
  </div>`;
  }
}

//connect City name with API & arrange code that we can have a default (San Francisco) at the end of the total code
function search() {
  let apiKey = "d35ea4f1a6c2987f94eb1e419288d906";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showInput);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city").value;
  city = cityInput;
  search();
}

let searchCityForm = document.querySelector("#form");
searchCityForm.addEventListener("submit", searchCity);

// Real-time date
let today = new Date();
let date = today.getDate();
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let month = months[today.getMonth()];
today.getMonth();
let year = today.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];
let hour = ("0" + today.getHours()).substr(-2);
let minutes = ("0" + today.getMinutes()).substr(-2);

let calenderDate = document.querySelector("#calender-time");
calenderDate.innerHTML = `${day}, ${date}.${month}.${year} / ${hour}:${minutes}`;

//Change Celcius
function changeCelcius(event) {
  event.preventDefault();
  units = "metric";
  let apiKey = "d35ea4f1a6c2987f94eb1e419288d906";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showInput);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

let clickCelcius = document.querySelector("#celcius");
clickCelcius.addEventListener("click", changeCelcius);

function changeFahrenheit(event) {
  event.preventDefault();
  units = "imperial";
  let apiKey = "d35ea4f1a6c2987f94eb1e419288d906";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showInput);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showForecast);
}

let clickFahrenheit = document.querySelector("#fahrenheit");
clickFahrenheit.addEventListener("click", changeFahrenheit);

//Current location button
function showCurrentPosition(position) {
  let apiKey = "d35ea4f1a6c2987f94eb1e419288d906";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showInput);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

function showCurrentData(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let buttonCurrentLocation = document.querySelector("#current-location");
buttonCurrentLocation.addEventListener("click", showCurrentData);

//default city name on page
let city = "Hawaii";
let units = "metric";
search();

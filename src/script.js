//Show input: search city name, weather today, wind, humidity
function showInput(response) {
  document.querySelector("#temp-1").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#humidity-1").innerHTML = response.data.main.humidity;
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#wind-1").innerHTML = Math.round(
    response.data.wind.speed
  );
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

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += ` 
  <div class="col-sm-2">
    <div class="overview-date">
       <h5 class="date_title">${formatHours(forecast.dt * 1000)}</h5>
       <img src="http://openweathermap.org/img/wn/${
         forecast.weather[0].icon
       }@2x.png"/>
      <h4 class="temperature"><span>${Math.round(
        forecast.main.temp
      )}</span>°C</h4>
      <ul>
      <li class="wind">Wind: <span>${Math.round(
        forecast.wind.speed
      )}</span> km/h</li>
      <li class="wind">Wind: <span>${Math.round(
        forecast.main.humidity
      )}</span>%</li>
      </ul>
    </div>
  </div>`;
  }
  console.log(forecast);
}

//connect City name with API & arrange code that we can have a default (San Francisco) at the end of the total code
function search(city) {
  let apiKey = "d35ea4f1a6c2987f94eb1e419288d906";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showInput);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  search(city);
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
let hour = today.getHours();
let minutes = ("0" + today.getMinutes()).substr(-2);

let dateElement = document.querySelector("#date-time");
dateElement.innerHTML = `${day}, ${hour}:${minutes}`;

let calenderDate = document.querySelector("#calender-time");
calenderDate.innerHTML = `${date}.${month}.${year}`;

// Changing Celcius
function showCelcius(response) {
  document.querySelector("#temp-1").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
}

function changeCelcius(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  let apiKey = "d35ea4f1a6c2987f94eb1e419288d906";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCelcius);
}

let clickCelcius = document.querySelector("#celsius");
clickCelcius.addEventListener("click", changeCelcius);

// Changing Fahrenheit
function showFahrenheit(response) {
  document.querySelector("#temp-1").innerHTML = `${Math.round(
    (response.data.main.temp * 9) / 5 + 32
  )}°F`;
}

function changeFahrenheit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  let apiKey = "d35ea4f1a6c2987f94eb1e419288d906";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showFahrenheit);
}

let clickFahrenheit = document.querySelector("#fahrenheit");
clickFahrenheit.addEventListener("click", changeFahrenheit);

//Current location button
function showCurrentInput(response) {
  document.querySelector("#temp-1").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#humidity-1").innerHTML = response.data.main.humidity;
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#wind-1").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#enter-city").value = response.data.name;
}

function showCurrentPosition(position) {
  let apiKey = "d35ea4f1a6c2987f94eb1e419288d906";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentInput);
}

function showCurrentData(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let buttonCurrentLocation = document.querySelector("#current-location");
buttonCurrentLocation.addEventListener("click", showCurrentData);

//default city name on page
search("San Francisco");

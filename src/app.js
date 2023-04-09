function formattedTime(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let cityInput = document.querySelector("#search-city");
  cityInput.innerHTML = response.data.name;

  let degreesTemperature = document.querySelector("#current-degrees-temp");
  degreesTemperature.innerHTML = Math.round(response.data.main.temp);

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let weatherHumidity = document.querySelector("#weather-humidity");
  weatherHumidity.innerHTML = `Humidy: ${response.data.main.humidity}%`;

  let weatherWind = document.querySelector("#weather-wind");
  weatherWind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;

  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = formattedTime(response.data.dt * 1000);
}

function searchCity(city) {
  let apiKey = `c49ac0d4966a15e494a3ad92063a514f`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-location-input").value;
  searchCity(city);
}

function showPositionWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `c49ac0d4966a15e494a3ad92063a514f`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function searcCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(showPositionWeather);
}

let searchLocation = document.querySelector("#search-location");
searchLocation.addEventListener("submit", handleSubmit);

let currentPosition = document.querySelector("#search-current-position");
currentPosition.addEventListener("click", searcCurrentPosition);

searchCity("Siaya");

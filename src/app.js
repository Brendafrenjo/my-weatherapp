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

function showForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-2">
                <div class="card" style="width: 4.8rem">
                  <div class="card-body">
                    <h5 class="card-title weather-forecast-date">${day}</h5>
                    <p class="card-text">
                      <img
                        src="https://openweathermap.org/img/wn/04d@2x.png"
                        alt="Icon"
                        width="36"
                      />
                    </p>
                    <div class="weather-forecast-temperature">
                      <span class="weather-forecast-temperature-max">27° </span
                      ><span class="weather-forecast-temperature-min">20°</span>
                    </div>
                  </div>
              </div>
            </div>
      `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function retrieveForecast(coordinates) {
  let apiKey = `93d43dfe3b4a950e5b187e5dc313705e`;
  let apiEndNote = `https://api.openweathermap.org/data/2.5/onecall?`;
  let apiUrl = `${apiEndNote}lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
  console.log(apiUrl);
}

function showTemperature(response) {
  let cityInput = document.querySelector("#search-city");
  let degreesTemperature = document.querySelector("#current-degrees-temp");
  let weatherDescription = document.querySelector("#weather-description");
  let weatherHumidity = document.querySelector("#weather-humidity");
  let weatherWind = document.querySelector("#weather-wind");
  let currentTime = document.querySelector("#current-time");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  cityInput.innerHTML = response.data.name;
  degreesTemperature.innerHTML = Math.round(response.data.main.temp);
  weatherDescription.innerHTML = response.data.weather[0].description;
  weatherHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  weatherWind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  currentTime.innerHTML = formattedTime(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  retrieveForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = `93d43dfe3b4a950e5b187e5dc313705e`;
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
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  let apiKey = `93d43dfe3b4a950e5b187e5dc313705e`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searcCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(showPositionWeather);
}

function showfahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let celsiusElement = document.querySelector("#current-degrees-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusElement = document.querySelector("#current-degrees-temp");
  celsiusElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchLocation = document.querySelector("#search-location");
searchLocation.addEventListener("submit", handleSubmit);

let currentPosition = document.querySelector("#search-current-position");
currentPosition.addEventListener("click", searcCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showfahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

searchCity("Siaya");

function currentDate(timestamp) {
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

function displayTemperature(response) {
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  city.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(celsiusTemperature);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = currentDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  icon.setAttribute("alt", response.data.weather[0].description);
}

function enterCity(city) {
  let apiKey = "f606a147394d27601839ffd5343624ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function submit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  enterCity(cityInput.value);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

enterCity("Johannesburg");

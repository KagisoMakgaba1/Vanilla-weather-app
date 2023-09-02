function displayTemperature(response) {
  console.log(response.data);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "f606a147394d27601839ffd5343624ee";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Johannesburg&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

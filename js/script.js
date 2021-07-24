
const KELVIN = 273;
const key = "0ebf0e29926cc939f557a936228e1129";   //557032969c724bb761054878c8c9acfa


const iconElement = document.querySelector(".weather-img");
const tempElement = document.querySelector(".TEMPERATURE");
const feelsLikeElenemt = document.querySelector(".feels-like");
const descElement = document.querySelector(".image-description");
const locationElement = document.querySelector(".user-location");
const notificationElement = document.querySelector(".your-location");
const celsiusElement = document.querySelector(".celsius");
const fahrenheitElement = document.querySelector(".fahrenheit");
const visibilityElement = document.querySelector(".visibility-value");
const pressureElement = document.querySelector(".pressure-value");
const humidityElement = document.querySelector(".humidity-value");
const windSpeedElement = document.querySelector(".wind-value");
const sunriseElement = document.querySelector(".todays-sunrise");
const sunsetElement = document.querySelector(".todays-sunset");
const timeAndDateElement = document.querySelector(".day-and-time");

const weather = {};

weather.temperature = {
  unit: "celsius"
}

//CHECK IF BROWSER SUPPORTS GEOLOCATION
if("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.getElementsByClassName.display = "block";
  notificationElement.innerHTML = `<h3 class="your-location">Browser doesn't support geolocation</h3>`;
}

// SET USER'S POSITION
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error) {
  notificationElement.getElementsByClassName.display = "block";
  notificationElement.innerHTML = `<h3 class="your-location"> ${error.message} </h3>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude) {
  let API = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(API)
  .then(function(response) {
    let data = response.json();
    return data;
  })
  .then(function(data) {
    weather.temperature.value = Math.floor(data.main.temp - KELVIN);
    weather.feelsLike = Math.floor(data.main.feels_like - KELVIN);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
    weather.visibility = data.visibility / 1000;
    weather.pressure = data.main.pressure / 1000;
    weather.humidity = data.main.humidity;
    weather.windSpeed = Math.floor(data.wind.speed * 3,6);
    weather.sunrise = data.sys.sunrise;
    weather.sunset = data.sys.sunset;
  })
  .then(function() {
    displayWeather();
  });
}


// DISPLAY WEATHER TO UI
function displayWeather() {
  iconElement.innerHTML = `<img class="now-weather-icon" src="img/${weather.iconId}.png">`;
  tempElement.innerHTML = `<h1 class="temperature-number">${weather.temperature.value}°C</h1>`;
  feelsLikeElenemt.innerHTML = `<h3 class="temp-feels-like">Feels like ${weather.feelsLike}°</h3>`;
  descElement.innerHTML = `<h4 class="image-weather-descp">${weather.description}</h4>`;
  locationElement.innerHTML = `<h3 class="your-location">${weather.city}, ${weather.country}</h3>`;
  visibilityElement.innerHTML = `${weather.visibility} km`;
  pressureElement.innerHTML = `${weather.pressure} mBar`;
  humidityElement.innerHTML = `${weather.humidity}%`;
  windSpeedElement.innerHTML = weather.windSpeed;
  sunriseElement.innerHTML = window.moment( weather.sunrise * 1000 ).format("HH:mm"); 
  sunsetElement.innerHTML =  window.moment( weather.sunset * 1000 ).format("HH:mm"); 

  document.querySelector(".search-bar").focus();
  document.querySelector(".search-bar").value = "";
}

// C to F conversion
function celsiusToFahrenheit(temperature) {
  return ( temperature * 9/5 ) + 32;
}

// WHEN THE USER CKLICKS ON THE FAHRENHEIT ELEMENT
fahrenheitElement.addEventListener("click", function() {
  if(weather.temperature.value === undefined) return;
  
  if(weather.temperature.unit == "celsius") {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    tempElement.innerHTML = `<h1 class="temperature-number">${fahrenheit}°F</h1>`;
    feelsLikeElenemt.innerHTML = `<h3 class="temp-feels-like">Feels like ${fahrenheit}°</h3>`;
    weather.temperature.unit = "fahrenheit";

    document.getElementById("F").style.fontWeight = "300";
    document.getElementById("F").style.fontSize = "32px";
    document.getElementById("F").style.marginTop = "-6px";
    document.getElementById("C").style.fontWeight = "200";
    document.getElementById("C").style.fontSize = "24px";
  }
});

// WHEN THE USER CKLICKS ON THE CELSIUS ELEMENT
celsiusElement.addEventListener("click", function() {
  if(weather.temperature.value === undefined) return;
  
  if(weather.temperature.unit == "fahrenheit") {
    let celsius = weather.temperature.value;
    celsius = Math.floor(celsius);

    tempElement.innerHTML = `<h1 class="temperature-number">${celsius}°C</h1>`;
    feelsLikeElenemt.innerHTML = `<h3 class="temp-feels-like">Feels like ${celsius}°</h3>`;
    weather.temperature.unit = "celsius";

    document.getElementById("C").style.fontWeight = "300";
    document.getElementById("C").style.fontSize = "32px";
    document.getElementById("F").style.fontWeight = "200";
    document.getElementById("F").style.fontSize = "24px";
    document.getElementById("F").style.marginTop = "0px";
  }
});

// GET VALUE FROM INPUT
function search() {
    getOtherCityWeather(document.querySelector(".search-bar").value);
}

 // ADD EVENTS ON THE BUTTON AND SEARCH BAR
document.querySelector(".city-search-button")
.addEventListener("click", function () {
  search();
});
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      search();
    }
  });

// GET WEATHER INFO BY CITY NAME
function getOtherCityWeather(cityName) {
  let cityAPI = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;

  fetch(cityAPI)
  .then(function(response) {
    let data = response.json();
    return data;
  })
  .then(function(data) {
    weather.temperature.value = Math.floor(data.main.temp - KELVIN);
    weather.feelsLike = Math.floor(data.main.feels_like - KELVIN);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
    weather.visibility = data.visibility / 1000;
    weather.pressure = data.main.pressure / 1000;
    weather.humidity = data.main.humidity;
    weather.windSpeed = Math.floor(data.wind.speed * 3,6);
    weather.sunrise = data.sys.sunrise;
    weather.sunset = data.sys.sunset;
  })
  .then(function() {
    displayWeather();
  });
}

const months = [
  "January",
 "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

//GET TIME AND DATE
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const hour = time.getHours();
  const hours12Format = hour >= 13 ? hour %12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeAndDateElement.innerHTML = `${months[month]} ${date}, ${(hours12Format < 10 ? "0"+hours12Format: hours12Format)}:${(minutes < 10 ? "0"+minutes: minutes)} ${ampm}`;
}, 1000)
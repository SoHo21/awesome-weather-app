//Display day and time
function formatDate(timestamp) {
let now = new Date(timestamp);
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
let now = new Date(timestamp);
let hours = now.getHours();
if (hours < 10){
    hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10){
    minutes = `0${minutes}`;
}
return `${hours}:${minutes}`;
}

//Display weather
function displayWeather(response) {
    let temperatureElement =document.querySelector("#temperature");
    let cityElement = document.querySelector("#location");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind");
    let nowElement = document.querySelector("#now");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
    nowElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(`src`, `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute(`alt`,response.data.weather[0].description);
}

//Display celsius/fahrenheit link
function displayFahrenheitTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");

    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
//(let h3 = document.querySelector("h3");

//h3.innerHTML = `${day} ${hours}:${minutes}`;)

//Display city
function search(city) {
    let apiKey = `34a66ef508b0cc45fe99cd407595565c`;
    let apiCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiCityUrl).then(displayWeather);   
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city");
    search(cityInputElement.value);
}

//Current position
function showPosition(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(displayPosition);
}

function displayPosition(position){
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
let apiKey = `34a66ef508b0cc45fe99cd407595565c`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);
}

//Display forecast
function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index];
        forecastElement.innerHTML +=
        `<div class="col-2">
                        <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
                        <h3>
                            ${formatHours(forecast.dt * 1000)}
                        </h3>
                        <div class="weather-forecast-temperature">
                            <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
                        </div>
                    </div>`;
    }
}


let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let enterCity = document.querySelector("#enter-city");
enterCity.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", showPosition )

search("Tokyo");
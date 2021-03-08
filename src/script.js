//Day and Time
let now = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10){
    hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10){
    minutes = `0${minutes}`;
}
console.log(now);

let h3 = document.querySelector("h3");

h3.innerHTML = `${day} ${hours}:${minutes}`;

//Display city and temperature

function displayCity(event){
event.preventDefault();
let apiKey = `34a66ef508b0cc45fe99cd407595565c`;
let city = document.querySelector("#city").value;
let apiCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiCityUrl).then(displayWeather);
}

function displayWeather(response){
    console.log(response.data);
    document.querySelector("#location").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
}

let enterCity = document.querySelector("#enterCity");
enterCity.addEventListener("submit", displayCity);

//Bonus Point
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

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", showPosition )
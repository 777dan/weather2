"use srtrict";
const weatherBlock = document.querySelector("#weather");

async function loadWeather(event) {
    weatherBlock.innerHTML = `
      <div class="weather_loading"><img class="loader" src="./images/loader.gif" alt=""></div>
      `;
    let cityValue = "Kharkiv";
    const server =
        `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&APPID=8ec8b0564cbd406f23cf6444f9e38187&units=metric`;
    const response = await fetch(server, { method: "GET" });
    const responseResult = await response.json();
    console.log(responseResult)
    if (response.ok) {
        getWeather(responseResult);
    } else {
        weatherBlock.innerHTML = responseResult.message;
    }
}

function getWeather(data) {
    console.log(data);
    const city = data.name;
    const temp = data.main.temp;
    const tempFeelsLike = data.main.feels_like;
    const humidity = data.main.humidity;
    const icon = data.weather[0].icon;
    const template = `
      <div><h2>${city}</h2></div>
      <div><img src="https://api.openweathermap.org/img/w/${icon}.png" alt=""></div>
      <div>Temperature: ${temp} &deg;C</div>
      <div>Feels like: ${tempFeelsLike} &deg;C</div>
      <div>Humidity: ${humidity}%</div>
      `;
    weatherBlock.innerHTML = template;
}

if (weatherBlock) {
    loadWeather();
}
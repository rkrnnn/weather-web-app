console.log('getWeatherData.js loaded');

// We are using https://openweathermap.org/ One Call API

var city = 'Sibiu';
var lang = 'ro';


getWeatherData(city);


function getWeatherData(city) {
    const url = new URL(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",ro&units=metric&&lang=" + lang + "&appid=" + APIkey
    );

    fetch(url, {
        method: "GET",
    }).then(response => response.json()
    .then(data => parseData(data)));
}


function parseData(json) {
    console.log(json);

    displayMainInfo(json);
    displayExtraInfo(json);
}


function displayMainInfo(json) {
    tempCurrentDisplay.innerText = Math.round(json.main.temp);
    weatherDescriptCurrentDisplay.innerText = json.weather[0].description;

    weatherIcon.style.backgroundImage = updateWeatherIcon(json.weather[0].icon);
    document.querySelector("body").style.backgroundImage = updateWeatherBg(json.weather[0].icon);
}


function displayExtraInfo(json) {
    humidityDisplay.firstChild.innerText = json.main.humidity;
    pressureDisplay.firstChild.innerText = json.main.pressure;
    windSpeedDisplay.firstChild.innerText = json.wind.speed;
    realFeelDisplay.firstChild.innerText = json.main.feels_like;
}


function updateWeatherIcon(id) {
    var icon = '';
    console.log(id);
    switch (id) {
        // Source: https://openweathermap.org/weather-conditions
        case '01d':
            icon = 'url(./res/svg/weather-day-sunny.svg)';
            break;
        case '11d':
            icon = 'url(./res/svg/weather-day-thunderstorm.svg)';
            break;
        default:
            icon = 'url(./res/svg/timer.svg)';
            break;
    }

    return icon;
}

function updateWeatherBg(id) {
    var img = '';
    console.log(id);
    switch (id) {
        // Source: https://openweathermap.org/weather-conditions
        case '01d':
            img = 'url(./img/sb_sunny.png)';
            break;
        case '11d':
            img = 'url(./res/pexels-josh-sorenson-1154510/pexels-josh-sorenson-1154510.png)';
            break;
        default:
            img = 'url(./img/sibiu-vreme-meteo-ploaie-furtuna-2-e2dd.jpeg)';
            break;
    }

    return img;
}
console.log('getForecastData.js loaded');

// We are using https://openweathermap.org/ One Call API
// var APIkey = '50a9457573607ec7ac058df8b8ddb7c9';
// var city = 'Sibiu';
// var lang = 'ro';

var maxDaysForecast = 7;

var forecastDisplay = document.querySelector(".forecast");

function getForecastData(lat, lon) {
    const url = new URL(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&lang=" + lang + "&units=metric&&appid=" + APIkey
    );

    fetch(url, {
        method: "GET",
    }).then(response => response.json()
    .then(data => {
        parseAlertData(data);
        parseForecastData(data)}));
}


function parseForecastData(json) {
    // console.log(json.daily);
    var forecastObj = json.daily;
    forecastDisplay.innerHTML = '';

    var i = 1;
    while (i <= maxDaysForecast) {
        var forecastSection = getForecastForDay(forecastObj[i]);
        forecastDisplay.appendChild(forecastSection);
        i++;
    }
}


function getForecastForDay(day) {
    var section = document.createElement("DIV");
    section.classList.add("section");

    var dayDisplay = document.createElement("DIV");
    dayDisplay.classList.add("day");
    var d = new Date(day.dt * 1000);
    dayDisplay.innerText = getDayOfTheWeek(d);
    // console.log(getDayOfTheWeek(d));

    var iconDisplay = document.createElement("DIV");
    iconDisplay.classList.add(updateWeatherIcon(day.weather[0].id, 'day'));
    iconDisplay.classList.add("icon");
    // console.log(updateWeatherIcon(day.weather[0].id, 'day'));

    var tempDisplay = document.createElement("DIV");
    tempDisplay.classList.add("temp");
    var temp = Math.round(day.temp.day);
    tempDisplay.innerHTML = temp + '<sup>o</sup> C';
    // console.log(temp + '<sup>o</sup> C');

    var descriptDisplay = document.createElement("DIV");
    descriptDisplay.classList.add("weather-descript");
    descriptDisplay.innerText = day.weather[0].description;
    // console.log(day.weather[0].description)

    section.appendChild(dayDisplay);
    section.appendChild(iconDisplay);
    section.appendChild(tempDisplay);
    section.appendChild(descriptDisplay);

    // console.log(section);
    return section;
}



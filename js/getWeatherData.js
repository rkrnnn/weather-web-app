console.log('getWeatherData.js loaded');

// We are using https://openweathermap.org/ One Call API
var APIkey = '';
var city = 'Sibiu';


getWeatherData(city);


function getWeatherData(city) {
    const url = new URL(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",ro&units=metric&&lang=ro&appid=" + APIkey
    );

    fetch(url, {
        method: "GET",
    }).then(response => response.json()
    .then(data => parseData(data)));
}


function parseData(json) {
    console.log(json);
    var currentTemp = json.main.temp;

    tempCurrentDisplay.innerText = Math.round(currentTemp);
    weatherDescriptCurrentDisplay.innerText = json.weather[0].description;
}
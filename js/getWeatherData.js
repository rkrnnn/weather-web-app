console.log('getWeatherData.js loaded');

// We are using https://openweathermap.org/ One Call API
var APIkey = '50a9457573607ec7ac058df8b8ddb7c9';
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

    updateSunriseSunset(json)
    displayMainInfo(json);
    displayExtraInfo(json);

    var lat = json.coord.lat;
    var lon = json.coord.lon;
    
    getForecastData(lat, lon);
}


function displayMainInfo(json) {
    tempCurrentDisplay.innerText = Math.round(json.main.temp);
    weatherDescriptCurrentDisplay.innerText = json.weather[0].description;

    var timeOfDay = '';
    var iconID = json.weather[0].icon;
    if (iconID[iconID.length - 1] == 'd') {
        timeOfDay = 'day';
    }
    else {
        timeOfDay = 'night';
    }
    
    weatherIcon.className = 'icon-display';
    weatherIcon.classList.add(updateWeatherIcon(json.weather[0].id, timeOfDay));
    // document.querySelector("body").style.backgroundImage = updateWeatherBg(json.weather[0].icon);
}


function displayExtraInfo(json) {
    humidityDisplay.firstChild.innerText = json.main.humidity;
    pressureDisplay.firstChild.innerText = json.main.pressure;
    windSpeedDisplay.firstChild.innerText = json.wind.speed;
    realFeelDisplay.firstChild.innerText = json.main.feels_like;
}


function updateWeatherIcon(id, timeOfDay) {
    var weatherClass = '';

    // Source: https://openweathermap.org/weather-conditions
    if (id < 300) {
        weatherClass = timeOfDay + '-thunderstorm';
    }
    else {
        if (id < 500) {
            weatherClass = timeOfDay + '-drizzle';
        }
        else {
            if (id < 600) {
                weatherClass = timeOfDay + '-rain';
            }
            else {
                if (id < 700) {
                    weatherClass = timeOfDay + '-snow';
                }
                else {
                    if (id < 800) {
                        weatherClass = 'atmospheric';
                    }
                    else {
                        switch (parseInt(id)) {
                            case 800:
                                weatherClass = timeOfDay + '-clear';
                                break;
                            case 801:
                                weatherClass = timeOfDay + '-clouds25';
                                break;
                            case 802:
                                weatherClass = timeOfDay + '-clouds50';
                                break;
                            case 803:
                                weatherClass = timeOfDay + '-clouds84';
                                break;
                            default:
                                weatherClass = 'clouds';
                                break;
                        }

                    }
                }
            }
        }
    }

    return weatherClass;
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


function updateSunriseSunset(json) {
    var d = new Date(json.sys.sunrise * 1000);
    sunriseDisplay.innerText = d.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit'});
    d = new Date(json.sys.sunset * 1000);
    sunsetDisplay.innerText = d.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit'});
}
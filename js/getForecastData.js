console.log('getForecastData.js loaded');

// We are using https://openweathermap.org/ One Call API
// var APIkey = '50a9457573607ec7ac058df8b8ddb7c9';
// var city = 'Sibiu';
// var lang = 'ro';

var alertDateEnd = document.getElementById("date-valab");
var alertTimestampEnd = document.getElementById("hour-valab");

var alertCodeDisplay = document.getElementById("avert-display");
var alertWeatherType = document.querySelector(".text-fenomen");

var displayAlerts = document.querySelector(".avert-disp");


var alertDummy = [{
    sender_name: 'National Meteorological Administration',
    event: 'advert-type====5, advert-level=2',
    start: 1625107035,
    end: 1625163418,
    description: 'În intervalul menționat, în cea mai mare parte a țării, vor fi perioade cu instabilitate atmosferică temporar accentuată ce se va manifesta prin averse torențiale, descărcări electrice și pe arii restrânse grindină și vijelii. În intervale scurte de timp sau prin acumulare, cantitățile de apă vor depăși local 25...40 l/mp.'
},
{
    sender_name: 'National Meteorological Administration',
    event: 'advert-type====2, advert-level=4',
    start: 1625107035,
    end: 1625163418,
    description: 'În intervalul menționat, în cea mai mare parte a țării, vor fi perioade cu instabilitate atmosferică temporar accentuată ce se va manifesta prin averse torențiale, descărcări electrice și pe arii restrânse grindină și vijelii. În intervale scurte de timp sau prin acumulare, cantitățile de apă vor depăși local 25...40 l/mp.'
}
]




function getForecastData(lat, lon) {
    const url = new URL(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey
    );

    fetch(url, {
        method: "GET",
    }).then(response => response.json()
    .then(data => parseForecastData(data)));
}


function parseForecastData(json) {
    console.log(json);
    if (json.alerts) {
        getWeatherAlerts(json.alerts);
    }
    else {
        getWeatherAlerts(alertDummy);
    }
}

function getWeatherAlerts(obj) {
    displayAlerts.innerHTML = '';
    var sourceDIV = createSource(obj[0]);
    
    var i = 0;
    while (i < obj.length) {
        var alert = createAlert(obj[i])
        displayAlerts.appendChild(alert);

        i++;
    }

    displayAlerts.appendChild(sourceDIV);
}

function createAlert(obj) {
    var alertDisplayDIV = document.createElement("DIV");
    alertDisplayDIV.classList.add("avertizare");
    alertDisplayDIV.classList.add("frost");

    var cod = getAlertSeverity(obj);
    alertDisplayDIV.classList.add(cod);
    
    var codAvertDIV = createCodDisplay(cod);
    var fenomenDisplayDIV = createFenomenDisplay(obj);
    var alertEndDIV = createAlertEndDisplay(obj);
    // var tooltip = createTooltip(obj);
    // alertDisplayDIV.classList.add("tooltip");

    alertDisplayDIV.appendChild(codAvertDIV);
    alertDisplayDIV.appendChild(fenomenDisplayDIV);
    alertDisplayDIV.appendChild(alertEndDIV);
    // alertDisplayDIV.appendChild(tooltip);
    
    return alertDisplayDIV;
}

    
function getAlertSeverity(obj) {
    var string = obj.event;
    var severity = parseInt(string[string.length - 1]);
    var cod = '';
    switch (severity) {
        case 2:
            cod = 'GALBEN';
            break;
        case 3:
            cod = 'PORTOCALIU';
            break;
        case 4:
            cod = 'ROSU';
            break;
        default:
            cod = 'VERDE';
            break;
    }

    return cod;
}

function getAlertType(obj) {
    var string = obj.event;
    var type = parseInt(string[15]);
    
    return type;
}


function createCodDisplay(cod) {
    var codAvertDIV = document.createElement("DIV");
    codAvertDIV.classList.add("cod-avert");
    var codAvertText = document.createTextNode("COD:");
    var codAvertDescript = document.createElement("SPAN");
    codAvertDescript.innerText = cod;
    codAvertDIV.appendChild(codAvertText);
    codAvertDIV.appendChild(codAvertDescript);

    return codAvertDIV;
}


function createFenomenDisplay(obj) {
    var type = getAlertType(obj);
    var alertType = '';
    var alertTypeText = '';
    switch (type) {
        case 2:
            alertType = 'heavy-rain';
            alertTypeText = 'Ploaie';
            break;
        case 3:
            alertType = 'storms';
            alertTypeText = 'Furtuni';
            break;
        case 4:
            alertType = 'snow';
            alertTypeText = 'Zapada';
            break;
        case 5:
            alertType = 'high-temp';
            alertTypeText = 'Temperaturi ridicate extreme';
            break;
        case 6:
            alertType = 'low-temp';
            alertTypeText = 'Temperaturi scăzute extreme';
            break;
        case 7:
            alertType = 'dense-fog';
            alertTypeText = 'Ceață';
            break;
        default:
            alertType = 'strong-wind';
            alertTypeText = 'Vânt';
            break;
    }

    var fenomenDisplayDIV = document.createElement("DIV");
    fenomenDisplayDIV.classList.add("fenomen");
    var fenomenIcon = document.createElement("DIV");
    fenomenIcon.classList.add("icon-fenomen");
    fenomenIcon.classList.add(alertType);
    var fenomenDescript = document.createElement("DIV");
    fenomenDescript.classList.add("text-fenomen");
    fenomenDescript.innerText = alertTypeText;

    fenomenDisplayDIV.appendChild(fenomenIcon);
    fenomenDisplayDIV.appendChild(fenomenDescript);

    return fenomenDisplayDIV;
}


function createAlertEndDisplay(obj) {
    var d = new Date(obj.end * 1000);
    var endTimestamp = d.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit'});
    var endDate = d.toLocaleDateString(lang);
    
    var alertEndDIV = document.createElement("DIV");
    alertEndDIV.classList.add("valabilitate-avert");
    var alertEndIcon = document.createElement("DIV");
    alertEndIcon.classList.add("icon-valab");
    var alertEnd = document.createElement("DIV");
    alertEnd.classList.add("text-valab");
    var date = document.createElement("SPAN");
    date.id = 'date-valab';
    date.innerText = endDate;
    var time = document.createElement("SPAN");
    time.id = 'hour-valab';
    time.innerText = endTimestamp;
    var br = document.createElement("BR");

    alertEndDIV.appendChild(alertEndIcon);
    alertEndDIV.appendChild(alertEnd);
    alertEnd.appendChild(date);
    alertEnd.appendChild(br);
    alertEnd.appendChild(time);

    return alertEndDIV;
}


function createTooltip(obj) {
    var tooltip = document.createElement("SPAN");
    tooltip.innerText = obj.description;
    tooltip.classList.add("tooltiptext");

    return tooltip;
}


function createSource(obj) {
    var sourceDIV = document.createElement("DIV");
    sourceDIV.classList.add("source");
    sourceDIV.innerText = 'Source: ';

    var link = document.createElement("A");
    var linkText = document.createTextNode(obj.sender_name);
    link.href = 'http://www.meteoromania.ro/avertizari/';
    link.appendChild(linkText);

    sourceDIV.append(link);

    return sourceDIV;
}
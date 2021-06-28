console.log('main.js loaded');

var footerBody = document.querySelector(".footer");
var footerHeader = document.querySelector(".footer-title");
var footerDropdownIcon = document.querySelector(".footer-title > .dropdown-icon");

var timeCurrentDisplay = document.querySelector(".time > .hour");
var dayOfTheWeekDisplay = document.querySelector(".time > .day");
var tempCurrentDisplay = document.querySelector(".main-info-display > .temp > span");
var weatherDescriptCurrentDisplay = document.querySelector(".main-info-display > .weather-descript");

displayCurrentTime();
dayOfTheWeekDisplay.innerText = getDayOfTheWeek(new Date());


function toggleFooter() {
    if (footerBody.classList.contains('down')) {
        footerBody.style.bottom = "0";
        footerHeader.style.margin = "-30px";
        footerDropdownIcon.innerText = ' v ';
        footerBody.classList.remove("down");
    }
    else {
        footerBody.style.bottom = "-160px";
        footerHeader.style.margin = "0px";
        footerDropdownIcon.innerText = ' ^ ';
        footerBody.classList.add("down");
    }
}


function displayCurrentTime() {
    var d = new Date();
    var n = d.toLocaleTimeString('ro-RO' , { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    timeCurrentDisplay.innerText = n;
    refreshTimeDisplay();
}

function refreshTimeDisplay(){
    var refresh=1000; // Refresh rate in milli seconds
    mytime=setTimeout('displayCurrentTime()',refresh);
}

function getDayOfTheWeek(date) {
    var weekday = '';
    var d = new Date(date);
    var options = { weekday: 'long'};
    weekday = new Intl.DateTimeFormat('en-EN', options).format(d);
    
    return weekday;
}
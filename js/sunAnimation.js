console.log('sunAnimation.js loaded');

var sunGraphic = document.querySelector(".sun-mark");
var daylightElapsedGraphic = document.querySelector(".arc-full");
var root = document.documentElement;

function setHourOfDay(time) {
    sunGraphic.style.offsetDistance = time + '%';
    daylightElapsedGraphic.style.strokeDasharray = ((time * 1.9) + 200) + 'px';
    // someDiv.style.left = '-50px';
    setTimeout(function(){
        sunGraphic.classList.add('anim-add');
    },100);
    setTimeout(function(){
        daylightElapsedGraphic.classList.add('anim-elapsed-add');
    },100);
}

setHourOfDay(10);

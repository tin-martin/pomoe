

var x = document.getElementById("myAudio"); 
if(localStorage.getItem("background") != null){
 
  document.getElementById('a').style.backgroundImage = "url('" + localStorage.getItem("background") + "')";
}

var timeWorked = 0;

function playAudio() { 
  x.play(); 
} 

function pauseAudio() { 
  x.pause(); 
} 

setInterval(()=>{
  var date = new Date();
  var hours = date.getHours();
  var minute = date.getMinutes();
  var ampm = "am";
  
  if(hours > 12){
    hours=hours-12;
    ampm = "pm"
  }else if(hours == 0){
    hours = 12;
    ampm = "pm"
  }
  if(minute < 10){
    document.getElementById("time").innerHTML = hours.toString() + ":" + "0"+ minute.toString() + " " + ampm;
  }else{
    document.getElementById("time").innerHTML = hours.toString() + ":" + minute.toString() + " " + ampm;
  }
  
  
 
},500);
 
function minToSec(min){
  return min*60;
}

//settings 
var pomoMin = localStorage.getItem("pomoMin");
var shortMin = localStorage.getItem("shortMin");
var longMin = localStorage.getItem("longMin");

if(pomoMin == null){
  pomoSec = minToSec(30);
}else{
  pomoSec = pomoMin*60;
}

if(shortMin == null){
  shortSec = minToSec(5);
}else{
  shortSec = shortMin*60;
}

if(longMin == null){
  longSec = minToSec(15);
}else{
  longSec = longMin*60;
}


var longBreakInterval = localStorage.getItem("longBreakInterval");
if(longBreakInterval == null){
  longBreakInterval = 4;
}


var time = pomoSec; // in seconds 
var timeSpent = 0;
var Interval;

var currentMode = null;
var count = 0;



function beautify(time){
  minutes = Math.floor(time/60);
  seconds = (time % 60)
  if(seconds < 10){
    return minutes.toString() + " " + "<span style='font-size:163px'>" + "0" + seconds.toString() + "</span>";
  }
  return minutes.toString() + " " + "<span style='font-size:163px'>" + seconds.toString() + "</span>";
}

function beautifyTitle(time){
  minutes = Math.floor(time/60);
  seconds = (time % 60);
  if(seconds < 10){
    return minutes.toString() + ":" + "0" + seconds.toString();
  }
  return minutes.toString() + ":" + seconds.toString();
}

started = false;
var n = document.getElementById("next");
n.style.opacity = 0;


c = 0;
function foo(){
  time -= 0.01;
  timeSpent += 0.01;
  timeTaken += 0.01;
  if(currentMode == "pomo"){
    timeWorked += 0.01;

  }
  var status = document.getElementById("inner-statusBar");
  var width = document.getElementById("statusBar").style.width;
  if(currentMode == "pomo"){

    status.style.width = (1-time/pomoSec)*100+"%";

  }else if(currentMode == "short break"){
    status.style.width = (1-time/shortSec)*100+"%";
  }else if(currentMode == "long break"){
    status.style.width = (1-time/longSec)*100+"%";
  }
  c++;
  if(c%100 == 0){
    updateTimer();
  }
}
function start(){
 
  var icon = document.getElementById("play-pause");
  if(!started){
    n.style.opacity = 100;
    clearInterval(Interval2);
    pomoe.src = "static-pomoe.gif"; 
    clearInterval(Interval);
    pauseAudio();
    x.currentTime = 0;
    if(!hidden){
      document.title = beautifyTitle(time);
    }else{
      document.title = "go to work!";
    }
    
    Interval = setInterval(foo, 10 );
    started = true;
    icon.src = "pause.svg";
  }else{
      n.style.opacity = 0;
      clearInterval(Interval);
      started = false;
      icon.src = "play.svg";
  }
}

pomoFunc();

function pomoFunc(){
    //document.body.style.backgroundColor = "#DC1C61";
    if(currentMode == "pomo"){
        return;
    }
    var status = document.getElementById("inner-statusBar");
    status.style.width = 0;
    currentMode = "pomo";
    started = true;
    start();
    clearInterval(Interval);
    document.getElementById("pomo").style.backgroundColor = '#882434';
    document.getElementById("long").style.backgroundColor = '#443483';
    document.getElementById("short").style.backgroundColor = '#443483';
    time = pomoSec;
    timeTaken = 0;
   document.getElementById("display").innerHTML = beautify(time);
}

function shortFunc(){

    if(currentMode == "short break"){
        return;
    }
   
    var status = document.getElementById("inner-statusBar");
    status.style.width = 0;
    currentMode = "short break";
    started = true;
    start();
  clearInterval(Interval);
  document.getElementById("short").style.backgroundColor = '#882434';
  document.getElementById("long").style.backgroundColor = '#443483';
  document.getElementById("pomo").style.backgroundColor = '#443483';
  time = shortSec;
  timeTaken = 0;
  document.getElementById("display").innerHTML = beautify(time);
}

function longFunc(){
    if(currentMode == "long break"){
        return;
    }
    var status = document.getElementById("inner-statusBar");
    status.style.width = 0;
    currentMode = "long break";
 started = true;
    start();
   clearInterval(Interval);
  document.getElementById("long").style.backgroundColor = '#882434';
  document.getElementById("short").style.backgroundColor = '#443483';
  document.getElementById("pomo").style.backgroundColor = '#443483';
  time = longSec;
  timeTaken = 0;
  count = 0;
  document.getElementById("display").innerHTML = beautify(time);
}

var Interval2;
function updateTimer(){ 
  
  document.getElementById("display").innerHTML = beautify(Math.round(time));
  if(hidden){
    document.title = "go to work!";
  }else{
    document.title = beautifyTitle(Math.round(time));
  }

  if(Math.round(time) <= 0){//done:))
    
    document.getElementById("hrWorked").innerHTML = Math.round( Math.floor(timeWorked/3600));
    document.getElementById("minWorked").innerHTML = Math.round(Math.floor(timeWorked / 60));
    //fuck
    document.title = "done ;)";
    document.getElementById("display").innerHTML = beautify(Math.round(time));
    playAudio();
    var pomoe = document.getElementById("pomoe");
    pomoe.src = "alarm.gif";
    Interval2 = setTimeout(()=>{
      pomoe.src = "static-pomoe.gif";
    }, 3000);
    next();
  }
}

function next(){
  if(currentMode == "pomo"){
    count += 1;
    if(count == longBreakInterval){
        
      //long break
      longFunc();
    }else{
      //short break
      
      shortFunc();
    }
  }else{
    //pomo
    pomoFunc();
  }
}


hidden = false;
function hide(){
    var display = document.getElementById("display");
    var hide_show = document.getElementById("hide-show");

    if(!hidden){

        display.style.opacity = 0;
        hidden = true;
        hide_show.src = "eye.svg";
    }else{
        display.style.opacity = 100;
        hidden = false;
        hide_show.src = "invisible.svg";
    }
}

document.getElementById('back').onclick = poo;
document.getElementById("a").style.opacity = 0.92;
function poo(){   
  document.getElementById("settings").style.display = "none";
  document.getElementById("main").style.opacity = 1;
  document.getElementById("a").style.opacity = 0.92;

}
function settings(){
 document.getElementById("settings").style.display = "flex";
 // window.location.href = "./settings.html";
 var settings = document.getElementById("settings");
 document.getElementById("main").style.opacity = 0.5;
 
  


 
}

var form = document.getElementById("form");
function handleForm(event) { poo(); event.preventDefault(); } 
form.addEventListener('submit', handleForm);
document.getElementById("form").onsubmit = submit;

var pomo = document.getElementById("pomoi");
var short = document.getElementById("shorti");
var long = document.getElementById("longi");
var background = document.getElementById("backgroundi");

if(localStorage.getItem("pomoMin") != null){
    pomo.value = localStorage.getItem("pomoMin");
}

if(localStorage.getItem("shortMin") != null){
    short.value = localStorage.getItem("shortMin");
}

if(localStorage.getItem("longMin") != null){
    long.value = localStorage.getItem("longMin");
}

if(localStorage.getItem("background") != null){
    background.value = localStorage.getItem("background");
}

if(localStorage.getItem("longBreakInterval") != null){

  document.getElementById("longBreakInterval").value = localStorage.getItem("longBreakInterval");
}else{
  document.getElementById("longBreakInterval").value = 4;
}
function submit(){
  localStorage.setItem("pomoMin",pomo.value);
  localStorage.setItem("shortMin",short.value);
  localStorage.setItem("longMin",long.value);
  localStorage.setItem("longBreakInterval",document.getElementById("longBreakIntervali").value);
  localStorage.setItem("background",backgroundi.value);
  document.backgroundColor = 0;
    document.getElementById("a").style.backgroundImage = "url('" + background.value + "')";
  
  var pomoMin = localStorage.getItem("pomoMin");
  var shortMin = localStorage.getItem("shortMin");
  var longMin = localStorage.getItem("longMin");
  
  
    pomoSec = pomoMin*60;
  
  
  
    shortSec = shortMin*60;
  
  
  
    longSec = longMin*60;


  longBreakInterval = localStorage.getItem("longBreakInterval");



  if(currentMode == "pomo"){
    time = pomoSec - timeTaken;
  }else if(currentMode == "short"){
    time = shortSec - timeTaken;
  }else{
    time = longSec - timeTaken;
  }

  
  console.log(timeTaken);
  updateTimer();
}

function adjust(){
    
}
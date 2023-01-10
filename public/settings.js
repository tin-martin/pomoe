var form = document.getElementById("form");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);
document.getElementById("form").onsubmit = submit;

var pomo = document.getElementById("pomo");
var short = document.getElementById("short");
var long = document.getElementById("long");
var longBreakInterval = document.getElementById("longBreakInterval");
var background = document.getElementById("background");

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
    document.getElementById('a').style.backgroundImage = "url('" + background.value + "')";

}

if(localStorage.getItem("longBreakInterval") != null){
    longBreakInterval.value = localStorage.getItem("longBreakInterval");
}
function submit(){
    localStorage.setItem("pomoMin",pomo.value);
    localStorage.setItem("shortMin",short.value);
    localStorage.setItem("longMin",long.value);
    console.log(longBreakInterval.value);
    localStorage.setItem("longBreakInterval",longBreakInterval.value);
    localStorage.setItem("background",background.value);
    document.getElementById('a').style.backgroundImage = "url('" + background.value + "')";
}

function adjust(){
    
}
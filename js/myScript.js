// ! constants
const API       = "97097b6bdad34048ed5f17c1097cb86a"
let   latitude  = 0;
let   longitude = 0;

const current = {
    city       : 'City',
    description: 'Description',
    temp       : 0,
    maxTemp    : 0,
    minTemp    : 0,
}

const text = {
    city         : document.querySelector('.current_city'),
    description_1: document.querySelector('.current_description_1'),
    description_2: document.querySelector('.current_description_2'),
    temp         : document.querySelector('.current_temp'),
    maxTemp      : document.querySelector('.current_temp_max'),
    minTemp      : document.querySelector('.current_temp_min'),
}

// === === === === ===

// / start funcrions
changeBg();
setTimeout(() => {
    getWeather();
}, 10);


// === === === === ===

// / coords
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        latitude  = position.coords.latitude
        longitude = position.coords.longitude
        // console.log(latitude, longitude)
    })
    current.city = 'Lviv'
}



// / change background
function changeBg() {
    var date      = new Date();
    var time      = date.getHours();
    var all       = document.querySelector('#all')
    var timeClass = (time > 4 && time < 20) ? 'day' : 'night'
    all.classList.add(timeClass)
}

// / get weather
function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${current.city}&appid=${API}&units=metric`)
        .then(response => response.json())
        .then(data => {
            // / weather
            current.description = data.weather[0].main
            current.temp        = Math.round(data.main.temp)
            current.maxTemp     = Math.ceil(data.main.temp_max)
            current.minTemp     = Math.floor(data.main.temp_min)
            updateHTML();
        })
        .catch(err => console.log("[ERROR] Wrong city name"))
}

// / update HTML
function updateHTML() {
    text.city.innerHTML          = current.city
    text.description_1.innerHTML = current.description
    text.description_2.innerHTML = current.description
    text.temp.innerHTML          = current.temp
    text.maxTemp.innerHTML       = current.maxTemp
    text.minTemp.innerHTML       = current.minTemp
}

// / endless reload
setInterval(() => {
    changeBg();
    getWeather();
}, 1000);
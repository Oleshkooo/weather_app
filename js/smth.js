// ! constants
const API          = "97097b6bdad34048ed5f17c1097cb86a"
var   latitude     = 49.8383
var   longitude    = 24.0232

var   currentCity  = 'Lviv'
var   current_city = document.querySelector('.current_city')


// === current ===
// weather
var currentTemp
var currentDescription
var currentTempMax
var currentTempMin
// html
var current_temp        = document.querySelector('.current_temp')
var current_description = document.querySelector('.current_description')
var current_temp_max    = document.querySelector('.current_temp_max')
var current_temp_min    = document.querySelector('.current_temp_min')
// default html changes


// ! window onload
document.addEventListener('load', event => {
    // / coords
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            latitude = position.coords.latitude
            longitude = position.coords.longitude
            // console.log(latitude, longitude)
            currentCity  = 'Lviv'
            current_city.innerHTML = currentCity
            console.log("onload")
        })
    }

    // / weather
    setInterval(() => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API}&units=metric`)
        .then(response => response.json())
        .then(data => {
            currentTemp        = data.main.temp
            currentDescription = data.weather[0].main
            currentTempMax    = Math.ceil(data.main.temp_max)
            currentTempMin    = Math.floor(data.main.temp_min)

            // / HTML changes
            current_temp.innerHTML        = currentTemp
            current_description.innerHTML = currentDescription
            current_temp_max.innerHTML    = currentTempMax
            current_temp_min.innerHTML    = currentTempMin
            console.log(currentTemp)
        })
        .catch(err => console.log("[ERROR] Wrong city name"))
    }, 5000)

})


// / bg change by time
var date = new Date();
var time = date.getHours();

var all = document.querySelector('#all')
var timeClass = (time > 4 && time < 20) ? 'day' : 'night'
all.classList.add(timeClass)
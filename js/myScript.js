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
    main();
})

function main() {
    console.log("asd")
}
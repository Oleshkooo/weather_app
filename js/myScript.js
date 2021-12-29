// ! constants
const API       = '97097b6bdad34048ed5f17c1097cb86a';
let   latitude  = 0;
let   longitude = 0;

const current = {
    city       : '',
    country    : '',
    description: '',
    temp       : 0,
    maxTemp    : 0,
    minTemp    : 0,
    feelsLike  : 0,
    humidity   : 0,
    windSpeed  : 0,
    perssure   : 0,
};

const sun = {
    sunrise    : 0,
    sunriseDate: 0,
    sunriseHour: 0,
    sunriseMin : 0,
    sunriseTime: 0,
    sunset     : 0,
    sunsetDate : 0,
    sunsetHour : 0,
    sunsetMin  : 0,
    sunsetTime : 0,
};

const text = {
    location   : document.querySelector('.current_location'),
    description: document.querySelector('.current_description'),
    temp       : document.querySelector('.current_temp'),
    minTemp    : document.querySelector('.current_temp_min'),
    maxTemp    : document.querySelector('.current_temp_max'),
    maxTemp    : document.querySelector('.current_temp_max'),
    feelsLike  : document.querySelector('.current_feels_like'),
    humidity   : document.querySelector('.current_humidity'),
    windSpeed  : document.querySelector('.current_wind_speed'),
    perssure   : document.querySelector('.current_perssure'),
    sunrise    : document.querySelector('.current_sunrise'),
    sunset     : document.querySelector('.current_sunset'),
};

// === === === === ===

// / start funcrions
changeBg();
getCoords();

// === === === === ===

// / change background
function changeBg() {
    var date      = new Date();
    var time      = date.getHours();
    var all       = document.querySelector('#all');
    var timeClass = time > 4 && time < 20 ? 'day' : 'night';
    all.classList.add(timeClass);
}

// / get coords
function getCoords() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
// success
function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;
    // console.log(latitude, longitude);
    // getLocation();
    getWeather();
    closePreloader();
}
// error
function error(err) {
    let geolocationError = document.querySelector('.geolocation_error');
    geolocationError.classList.remove('none');
    console.log('[ERROR] Allow geolocation');
    getCoords();
}

// / get location
// function getLocation() {
//     fetch(
//         `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${API}`
//     )
//         .then((response) => response.json())
//         .then((data) => {
//             current.city = data[0].name;
//             // console.log(current.city);
//             getWeather();
//             closePreloader();
//         })
//         .catch((err) => {
//             console.log('[ERROR] Wrong coordinates');
//         });
// }

// / get weather
function getWeather() {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API}&units=metric`
    )
        .then((response) => response.json())
        .then((data) => {
            // / weather
            current.city        = data.name;
            current.country     = data.sys.country;
            current.description = data.weather[0].main;
            current.temp        = Math.round(data.main.temp);
            current.maxTemp     = Math.ceil(data.main.temp_max);
            current.minTemp     = Math.floor(data.main.temp_min);

            sun.sunrise     = data.sys.sunrise;
            sun.sunriseDate = new Date(sun.sunrise * 1000);
            sun.sunriseHour = sun.sunriseDate.getHours();
            sun.sunriseMin  = sun.sunriseDate.getMinutes();
            sun.sunriseTime = sun.sunriseHour * 60 + sun.sunriseMin;

            sun.sunset     = data.sys.sunset;
            sun.sunsetDate = new Date(sun.sunset * 1000);
            sun.sunsetHour = sun.sunsetDate.getHours();
            sun.sunsetMin  = sun.sunsetDate.getMinutes();
            sun.sunsetTime = sun.sunsetHour * 60 + sun.sunsetMin;

            current.feelsLike = Math.round(data.main.feels_like);
            current.humidity  = Math.round(data.main.humidity);
            current.windSpeed = Math.round(data.wind.speed);
            current.perssure  = Math.round(data.main.pressure);

            progressbar();
            updateHTML();
        })
        .catch((err) => {
            console.log('[OWM ERROR] Something went wrong');
        });
}

function progressbar() {
    let now     = new Date();
    let hours   = now.getHours();
    let minutes = now.getMinutes();
    let time    = hours * 60 + minutes;
    let percents = ((time - sun.sunriseTime) * 100) / (sun.sunsetTime - sun.sunriseTime);
    let progressBar = document.querySelector('.progress-bar')
    progressBar.style.width = `${percents}%`;
}

// / update HTML
function updateHTML() {
    // current
    text.location.innerHTML    = `${current.city}, ${current.country}`;
    text.description.innerHTML = current.description;
    text.temp.innerHTML        = current.temp;
    text.maxTemp.innerHTML     = `${current.maxTemp}°`;
    text.minTemp.innerHTML     = `${current.minTemp}°`;

    function addZero(n) {
        return n < 10 ? '0' + n: n;
    }

    text.sunrise.innerHTML = `Sunrise ${addZero(sun.sunriseHour)}:${addZero(
        sun.sunriseMin
    )}`;
    text.sunset.innerHTML = `Sunset ${addZero(sun.sunsetHour)}:${addZero(
        sun.sunsetMin
    )}`;

    text.feelsLike.innerHTML = `${current.feelsLike}°`;
    text.humidity.innerHTML  = `${current.humidity}%`;
    text.windSpeed.innerHTML = `${current.windSpeed} m/s`;
    text.perssure.innerHTML  = `${current.perssure} mmHg`;
}

// / close preloader
function closePreloader() {
    setTimeout(() => {
        let i             = 100;
        let preloader     = document.querySelector('#preloader');
        let preloaderImg  = document.querySelector('.preloader_img');
        let preloaderText = document.querySelector('.preloader_text');
        let interval      = setInterval(() => {
            if (i > 0) {
                preloader.style.opacity     = `${i}%`;
                preloaderImg.style.opacity  = `${i}%`;
                preloaderText.style.opacity = `${i}%`;
                i--;
            } else clearInterval(interval);
        }, 3);
    }, 1500);
}

// / endless reload
setInterval(() => {
    changeBg();
    getWeather();
}, 15000);

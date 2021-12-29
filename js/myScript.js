// ! constants
const WEATHER_API = '97097b6bdad34048ed5f17c1097cb86a';
const GEOCODE_API = 'Bu1x816b1miwfr1H9_DxIWQ7O30wbq8q6fzVJbewzTE';
let   latitude    = 0;
let   longitude   = 0;

const current = {
    city       : '',
    description: '',
    temp       : 0,
    maxTemp    : 0,
    minTemp    : 0,
};

const textCurrent = {
    city         : document.querySelector('.current_city'),
    description_1: document.querySelector('.current_description_1'),
    description_2: document.querySelector('.current_description_2'),
    temp         : document.querySelector('.current_temp'),
    maxTemp      : document.querySelector('.current_temp_max'),
    minTemp      : document.querySelector('.current_temp_min'),
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
    // console.log(latitude, longitude)
    getLocation();
}
// error
function error(err) {
    let geolocationError = document.querySelector('.geolocation_error');
    geolocationError.classList.remove('none');
    console.log('[ERROR] Allow geolocation');
    getCoords();
}

// / get location
function getLocation() {
    fetch(
        `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=en-US&apikey=${GEOCODE_API}`
    )
        .then((response) => response.json())
        .then((data) => {
            current.city = data.items[0].address.district;
            // current.city = data.items[0].address.city
            // console.log(current.city);
            getWeather();
            closePreloader();
        })
        .catch((err) => {
            console.log('[ERROR] Wrong coordinates');
        });
}

// / get weather
function getWeather() {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${current.city}&appid=${WEATHER_API}&units=metric`
    )
        .then((response) => response.json())
        .then((data) => {
            // / weather
            current.description = data.weather[0].main;
            current.temp        = Math.round(data.main.temp);
            current.maxTemp     = Math.ceil(data.main.temp_max);
            current.minTemp     = Math.floor(data.main.temp_min);
            updateHTML();
        })
        .catch((err) => {
            console.log('[ERROR] Wrong city name');
        });
}

// / update HTML
function updateHTML() {
    textCurrent.city.innerHTML          = current.city;
    textCurrent.description_1.innerHTML = current.description;
    textCurrent.description_2.innerHTML = current.description;
    textCurrent.temp.innerHTML          = current.temp;
    textCurrent.maxTemp.innerHTML       = current.maxTemp;
    textCurrent.minTemp.innerHTML       = current.minTemp;
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
}, 10000);

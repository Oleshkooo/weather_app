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
};

const textCurrent = {
    location   : document.querySelector('.current_location'),
    description: document.querySelector('.current_description'),
    temp       : document.querySelector('.current_temp'),
    minTemp    : document.querySelector('.current_temp_min'),
    maxTemp    : document.querySelector('.current_temp_max'),
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
            updateHTML();
        })
        .catch((err) => {
            console.log('[OWM ERROR] Something went wrong');
        });
}

// / update HTML
function updateHTML() {
    // current
    textCurrent.location.innerHTML      = `${current.city}, ${current.country}`;
    textCurrent.description.innerHTML = current.description;
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

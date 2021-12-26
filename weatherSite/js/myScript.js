var date = new Date();
var time = date.getHours();
time = 5;
console.log(time);

// ! bg  change
var all = document.getElementById('all');
var timeClass = (time > 4 && time < 20) ? 'day' : 'night'
$(all).addClass(timeClass);
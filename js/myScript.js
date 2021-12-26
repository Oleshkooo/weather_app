var date = new Date();
var time = date.getHours();
console.log(time);

// ! bg change
var all = document.querySelector('#all')
var timeClass = (time > 4 && time < 20) ? 'day' : 'night'
all.classList.add(timeClass)

var temp = 5;
var current_temp = document.querySelector('.current_temp')
current_temp.innerHTML = temp

// invisible space if temperature < 0
var invSpace = document.querySelector('.inv-space')
if (temp>=0) {
    invSpace.classList.remove('none')
}
else {
    invSpace.classList.add('none')
}
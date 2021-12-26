var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
var hours = today.getHours();
var minutes = today.getMinutes();

if (hours <= 9) {
  today = 'Дані оновлено ' + dd + '.' + mm + '.' + yyyy + ' о ' + '0' + hours + ':' + minutes;
  if (minutes <= 9) {
    today = 'Дані оновлено ' + dd + '.' + mm + '.' + yyyy + ' о ' + '0' + hours + ':' + '0' + minutes;
  }
}
else if (minutes <= 9) {
  today = 'Дані оновлено ' + dd + '.' + mm + '.' + yyyy + ' о ' + hours + ':' + '0' + minutes;
}
else {
  today = 'Дані оновлено ' + dd + '.' + mm + '.' + yyyy + ' о ' + hours + ':' + minutes;
}

document.getElementById('time').innerHTML = today
/// Flipping Card v1
//$(document).on('click', '#front', function() {
//  $('#flip').addClass('flip')
//})
//$(document).on('click', '#back', function() {
//  $('#flip').removeClass('flip')
//})



//! Flipping Card v2
var clicks = 0;
var degrees = 0;
/// CSS styles change
function func() {
    var flip = document.getElementsByClassName('flip');
    var style_flip = flip[0].style;
    style_flip.transform = "rotateY("+degrees+"deg)";
}
/// Click on front side
$(document).on('click', '#front', function() {
    degrees+=180;
    clicks++;
    func();
})
/// Click on back side
$(document).on('click', '#back', function() {
    degrees+=180;
    clicks++;
    func();
})



//! Back side
/// Click on qr button
$(document).on('click', '.qr', function() {
  degrees-=180;
  $('#qr').addClass('qr-bar-on').removeClass('qr-bar-off');
  $('#bar').removeClass('qr-bar-on').addClass('qr-bar-off');
  $('#if-qr').removeClass('hidden');
  $('#if-bar').addClass('hidden');
})
/// Click on bar button
$(document).on('click', '.bar', function() {
  degrees-=180;
  $('#bar').addClass('qr-bar-on').removeClass('qr-bar-off');
  $('#qr').removeClass('qr-bar-on').addClass('qr-bar-off');
  $('#if-bar').removeClass('hidden');
  $('#if-qr').addClass('hidden');
})

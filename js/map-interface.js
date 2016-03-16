var apiKey = require("./../.env").apiKey;

$(document).ready(function(){
  $("form#addressForm").submit(function(event){
    var splitAddress = $("#address").val();
    var address = splitAddress.split(" ").join("+");
    var lat;
    var long;
    $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + "&key=" + apiKey).then(function(results){
      lat = results.results[0].geometry.location.lat;
      long = results.results[0].geometry.location.lng;
      $('.geometry').text("The latitude of " + splitAddress + " is " + lat + ". The longitude of " + splitAddress + " is " + long);
      var userLatLng = new google.maps.LatLng(lat, long);
      var myOptions = {
        zoom : 16,
        center : userLatLng,
        mapTypeId : google.maps.MapTypeId.ROADMAP
      };
      var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
    });
    event.preventDefault();
  });
});



// $(document).ready(function(){
//   $("#getHike").click(function(){
//     var splitAddress = $("#address").val();
//     var address = splitAddress.split(" ").join("+");
//     var lat = results.results[0].geometry.location.lat;
//     var long = results.results[0].geometry.location.lng;
//     $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + "&key=" + apiKey).then(function(results){
//       debugger;
//       $('#map').text("The latitude of " + splitAddress + " is " + lat);
//       $('#map').text("The longitude of " + splitAddress + " is " + long);
//     });
//   });
// });

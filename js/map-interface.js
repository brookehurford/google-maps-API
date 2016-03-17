var apiKey = require("./../.env").apiKey;
var weatherAPI = require("./../.env").weatherAPI;

$(document).ready(function(){
  $(".listForm").hide();
  $("#weather").hide();
  $("form#addressForm").submit(function(event){
    var splitAddress = $("#address").val();
    var address = splitAddress.split(" ").join("+");
    var lat;
    var long;
    $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + "&key=" + apiKey).then(function(results){
      lat = results.results[0].geometry.location.lat;
      long = results.results[0].geometry.location.lng;
      var userLatLng = new google.maps.LatLng(lat, long);
      var myOptions = {
        zoom : 16,
        center : userLatLng,
        mapTypeId : google.maps.MapTypeId.ROADMAP
      };
      var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
      new google.maps.Marker({
        map: mapObject,
        position: userLatLng
      });
    });
    var city = $('#address').val();
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherAPI, function(response){
      console.log()
      $(".todaysWeather").empty();
      $(".todaysWeather").prepend("<p>Today's Weather:<br>" + response.weather[0].description + "</p>");
      $.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + weatherAPI, function(response){
        console.log(response);
        $("#weather5Day").empty();
        $('#day1').prepend("5 Day Forecast:<br>");
        for (var i = 0; i <= 5; i++) {
          $('#day' + [i]).append(response.list[i].weather[0].description);
        }
      });
    });
    event.preventDefault();
    $(".listForm").show();
    $("#weather").show();
  });
});

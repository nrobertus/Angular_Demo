app.controller('mainController', function($scope, $http){
  $scope.forecast = [];
  $scope.city = "Bozeman, MT"
  //Grab the current weather
  $scope.getWeather = function() {

      var responsePromise = $http.get("http://api.openweathermap.org/data/2.5/weather?q=" + $scope.city);

      responsePromise.success(function(data, status, headers, config) {
          $scope.current = {humidity:data.main.humidity, pressure:data.main.pressure, temp:((data.main.temp - 273.15)* 1.8000)+32.00, description:data.weather[0].description};
      });
      responsePromise.error(function(data, status, headers, config) {
          alert("AJAX failed!");
      });
  };
  //Grab the forecast
  $scope.getForecast = function() {

      var responsePromise = $http.get("http://api.openweathermap.org/data/2.5/forecast?q=" + $scope.city);

      responsePromise.success(function(data, status, headers, config) {
        var days = [];
        console.log(data);
        for(var i = 0; i<data.list.length; i++){
          var date_data = data.list[i];
          var day = date_data.dt_txt.split(' ')[0];
          var time = date_data.dt_txt.split(' ')[1];
          var weather = {humidity:date_data.main.humidity, pressure:date_data.main.pressure, temp:date_data.main.temp, description:date_data.weather[0].description, wind:date_data.wind.speed, wind_direc:date_data.wind.deg}
          if ( !getByValue(days, day) ){
            days.push({day:day, times:[{time:time, weather:weather}]});
          }
          else{
            var index = days.map(function(x) {return x.day; }).indexOf(day);
            var timeObject = {time:time, weather:weather}
            days[index].times.push(timeObject);
          }
        }
        $(days).each(function(index, day){
          var temps = [];
          var winds = [];
          var humidities = [];
            $(day.times).each(function(index, time){
              temps.push(KtoF(time.weather.temp));
              winds.push(time.weather.wind);
              humidities.push(time.weather.humidity);
              
            });
          console.log(temps);
          var min_temp = Math.min.apply(Math, temps);
          var max_temp = Math.max.apply(Math, temps);
          var wind_avg = (winds.reduce(function(a, b) { return a + b; })) / winds.length;
          var humid_avg = (humidities.reduce(function(a, b) { return a + b; })) / humidities.length;

          var trends = {min_temp: min_temp, max_temp:max_temp, wind_avg:wind_avg, humid_avg:humid_avg,}
          days[index].trends = trends;
        });
       $scope.forecast = days;
        console.log(days)
      });
      responsePromise.error(function(data, status, headers, config) {
          alert("AJAX failed!");
      });
  };

function getByValue(arr, value) {

  var result  = arr.filter(function(o){return o.day == value;} );

  return result? result[0] : null; // or undefined

}

function KtoF(K){
  return ((K - 273.15)* 1.8000)+32.00;
}

// Code to get location
var geocoder;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  } 
  //Get the latitude and the longitude;
  function successFunction(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      codeLatLng(lat, lng)
  }

  function errorFunction(){
      alert("Geocoder failed");
  }
  function initialize() {
    geocoder = new google.maps.Geocoder();
  }

  function codeLatLng(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      console.log(results);
      $scope.city = results[1].formatted_address.split(", USA")[0];
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }


  initialize();
  $scope.getWeather();
  $scope.getForecast();
  
});
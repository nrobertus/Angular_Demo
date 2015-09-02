app.controller('mainController', function($scope, $http){
  var current = '';
  $scope.city = 'Bozeman, MT';
  $scope.forecast = [];
  $scope.getWeather = function() {

      var responsePromise = $http.get("http://api.openweathermap.org/data/2.5/weather?q=" + $scope.city);

      responsePromise.success(function(data, status, headers, config) {
          $scope.current = {humidity:data.main.humidity, pressure:data.main.pressure, temp:((data.main.temp - 273.15)* 1.8000)+32.00, description:data.weather[0].description};
      });
      responsePromise.error(function(data, status, headers, config) {
          alert("AJAX failed!");
      });
  };
  $scope.getForecast = function() {

      var responsePromise = $http.get("http://api.openweathermap.org/data/2.5/forecast?q=" + $scope.city);

      responsePromise.success(function(data, status, headers, config) {
        console.log(data);
        for(var i = 0; i<data.list.length; i++){
          var date_data = data.list[i];
          var newDate = {date:date_data.dt_txt, humidity:date_data.main.humidity, pressure:date_data.main.pressure, temp:((date_data.main.temp - 273.15)* 1.8000)+32.00, description:date_data.weather[0].description};
          $scope.forecast.push(newDate);
        }
          //$scope.forecast = {humidity:data.main.humidity, pressure:data.main.pressure, temp:((data.main.temp - 273.15)* 1.8000)+32.00, description:data.weather[0].description};
      });
      responsePromise.error(function(data, status, headers, config) {
          alert("AJAX failed!");
      });
  };



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
      $scope.location = results
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }
  $scope.getWeather();
  $scope.getForecast();
  initialize();
});
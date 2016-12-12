var app = angular.module('weather', []);

/*app.controller('weathersController', function ($scope) {
    $scope.weatherCurrent = [ ];
    $scope.weatherForecast = [ ];
}
*/
var lat;
var Pos;
var coord1;
var coord2;
var city = "Kiev Ukraine";


app.controller('weathersController', function ($scope, API) {
    this.tab = 1 ;
    this.selectTab = function (tab) {
        this.tab = tab;
    };
    /*navigator.geolocation.getCurrentPosition(function(position) {
         lat = position.coords.latitude;
         Pos = position.coords.longitude;
             lat = lat.toFixed(1);
             Pos = Pos.toFixed(1);
          console.log(typeof lat);
          od = lat +"," + Pos;
        console.log(od);
        console.log(typeof od);
    })
    coord1 = lat;
    coord2 = Pos;
    console.log(coord1,coord2);*/


    API.getWeatherCurrent().then(function (current) {
        $scope.current = current;
       /* console.log(current);*/
    });

    $scope.current = [];

    API.getWeatherForecast().then(function (forecast) {
        $scope.forecast = forecast;
  /*      console.log(forecast);*/
    });

    $scope.my_forecast = [ ];


    $scope.searchCity = function () {
        API.SearchCity($scope.searchSettings).then(function (search) {
            $scope.search = search;
            console.log(search);
        });
    };
    $scope.searchSettings = {
        query: 'Kiev'
    };

    $scope.searched = [];


});

app.service('API', function ($http, $q){
    return {
        getWeatherCurrent: function () {
            var key = '5c40c72b9b544023b9b74029162111';
            var d = $q.defer();
            $http({
                method: 'GET',
                url: 'http://api.apixu.com/v1/current.json',
                params: {
                    key : key,
                    q: city
                }
            }).then(function (data) {
                var current = data.data.current;
               /* console.log(api_current);*/
                 console.log(current);
                d.resolve(current);
            });
            return d.promise;
        },
        getWeatherForecast: function () {
            var key = '5c40c72b9b544023b9b74029162111';
            var d = $q.defer();
            $http({
                method: 'GET',
                url: 'http://api.apixu.com/v1/forecast.json',
                params: {
                    key : key,
                    q: city,
                    days: '7'
                }
            }).then(function (data) {
                console.log(data);
                var forecast = data.data.forecast.forecastday;
                console.log(forecast);

                d.resolve(forecast);
            });
            return d.promise;
        }, SearchCity: function (params) {
            var key = '5c40c72b9b544023b9b74029162111';
            var d = $q.defer();
            $http({
                method: 'GET',
                url: 'http://api.apixu.com/v1/search.json',
                params: {
                    key : key,
                    q: params.query,
                    city: name

                }
            }).then(function (data) {
                console.log(data);
                var search = data.data[1];
                d.resolve(search);
                console.log(search)
            });
            return d.promise;
        },


/*SearchCity: function () {
            var key = '5c40c72b9b544023b9b74029162111';
            var d = $q.defer();
            $http({
                method: 'GET',
                url: 'http://api.apixu.com/v1/search.json',
                params: {
                    key : key,
                    q: city
                 }
            }).then(function (data) {
                var search = data.location;
                d.resolve(search);
                console.log(search);
            });
            return d.promise;
        }*/
    }
});
app.directive('weatherItem', function() {
    return{
        restrict: 'E',
        templateUrl: 'weather-item.html'
    }
});


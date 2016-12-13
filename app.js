var app = angular.module('weather', []);

var lat;
var lon;
var city = "Kiev Ukraine";

app.controller('weathersController', function ($scope, API) {
    this.tab = 1 ;
    this.selectTab = function (tab) {
        this.tab = tab;
    };

    $scope.searchCity = function () {
        API.SearchCity($scope.searchSettings).then(function (search) {
            $scope.search = search;
           /* console.log(search);*/
        });

        API.getWeatherCurrent($scope.searchSettings).then(function (current) {
            $scope.current = current;
            /*console.log(current);*/
        });
        API.getWeatherForecast($scope.searchSettings).then(function (forecast) {
            $scope.forecast = forecast;
            /*      console.log(forecast);*/
        });
    };

    $scope.searchGeo = function () {
       navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
           /* lat = lat.toFixed(1);
            Pos = Pos.toFixed(1);*/
            console.log(lat);
            console.log( lon);
            var od = lat + ',' + lon;
            console.log(od);
            console.log(typeof od);    /** полученные координаты выводятся и правильно */
        });
        API.SearchCity2($scope.searchSettings).then(function(od) {
            console.log(od);
            $scope.od = od;
            console.log(od);  /** тут тоже выводятся данные геолокации*/
        });
        API.getWeatherCurrent2($scope.searchSettings).then(function (current) {
            $scope.current = current;
           /* console.log(current);*/
        });
        API.getWeatherForecast2($scope.searchSettings).then(function (forecast) {
            $scope.forecast = forecast;
            /*      console.log(forecast);*/
        });
    };

    $scope.searchSettings = {
        query: 'Kiev',
        od: 'lat,lon'  /**а вот эти уходят в запрос и возвращают неправильный результат типа Афганистана, Франции и т.д., в
                         зависимости от ого, в каком порядке написать lon / lat */
    };

    $scope.current = [];
    $scope.my_forecast = [ ];
    $scope.searched = [];

});

app.service('API', function ($http, $q){
    return {
        getWeatherCurrent: function (params) {
            var key = '5c40c72b9b544023b9b74029162111';
            var d = $q.defer();
            $http({
                method: 'GET',
                url: 'http://api.apixu.com/v1/current.json',
                params: {
                    key : key,
                    q: params.query
                }
            }).then(function (data) {
                var current = data.data.current;
               /* console.log(api_current);*/
                 console.log(current);
                d.resolve(current);
            });
            return d.promise;
        },
        getWeatherForecast: function (params) {
            var key = '5c40c72b9b544023b9b74029162111';
            var d = $q.defer();
            $http({
                method: 'GET',
                url: 'http://api.apixu.com/v1/forecast.json',
                params: {
                    key : key,
                    q: params.query,
                    days: '7'
                }
            }).then(function (data) {
                console.log(data);
                var forecast = data.data.forecast.forecastday;
               /* console.log(forecast);*/

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
        getWeatherCurrent2: function (paramss) {
            var key = '5c40c72b9b544023b9b74029162111';
            var d = $q.defer();
            $http({
                method: 'GET',
                url: 'http://api.apixu.com/v1/current.json',
                params: {
                    key : key,
                    q: paramss.od
                }
            }).then(function (data) {
                var current = data.data.current;
                /* console.log(api_current);*/
                console.log(current);
                d.resolve(current);
            });
            return d.promise;
        },
        getWeatherForecast2: function (paramss) {
            var key = '5c40c72b9b544023b9b74029162111';
            var d = $q.defer();
            $http({
                method: 'GET',
                url: 'http://api.apixu.com/v1/forecast.json',
                params: {
                    key : key,
                    q: paramss.od,
                    days: '7'
                }
            }).then(function (data) {
                console.log(data);
                var forecast = data.data.forecast.forecastday;
                /* console.log(forecast);*/

                d.resolve(forecast);
            });
            return d.promise;
        }, SearchCity2: function (paramss) {
            var key = '5c40c72b9b544023b9b74029162111';
            var d = $q.defer();
            $http({
                method: 'GET',
                url: 'http://api.apixu.com/v1/search.json',
                params: {
                    key : key,
                    q: paramss.od,
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


var app = angular.module('weather', []);

/*app.controller('weathersController', function ($scope) {
    $scope.weatherCurrent = [ ];
    $scope.weatherForecast = [ ];
}
*/
app.controller('weathersController', function ($scope, API) {
    this.tab = 1 ;
    this.selectTab = function (tab) {
        this.tab = tab;
    };

    $scope.weatherCurrent = []
    ;
    $scope.weatherForecast = [

    ]
});

app.service('API', function ($http) {
    return {
        getWeatherCurrent: function () {
            var key = '5c40c72b9b544023b9b74029162111';

            $http({
                method: 'GET',
                url: 'http://api.apixu.com/v1/current.json',
                params: {
                    key : '5c40c72b9b544023b9b74029162111',
                    q: 'Odessa'
                }
            })

        }
    }
});


app.directive('weatherItem', function() {
    return{
        restrict: 'E',
        templateUrl: 'weather-item.html'
    }
});
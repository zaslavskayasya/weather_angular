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

    API.getWeatherCurrent().then(function (my_current) {
        $scope.weatherCurrent = my_current;
    });

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
                    key : key,
                    q: 'Odessa Ukraine'
                }
            }).then(function (data) {
                var acurrent = [data.data.current];
               /* console.log(api_current);*/
                var my_current = acurrent.map(function (api_current, index){
                    return {
                        dateUpdate: api_current.last_updated,
                        temp: api_current.temp_c,
                        wind: api_current.wind_kph,
                        humidity: api_current.humidity,
                        feelslike: api_current.feelslike_c
                    }
                });
                console.log(my_current);
            });
        }
    }
});


app.directive('weatherItem', function() {
    return{
        restrict: 'E',
        templateUrl: 'weather-item.html'
    }
});
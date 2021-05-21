$(document).ready(function () {
    var crd;
    moment().format();

    // Setting options for geolocation
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    // If geolocation is successful gets cords and run createWeatherWidget()
    function success(pos) {
        crd = pos.coords;

        createWeatherWidget();
    }

    // If error in geoloaction displays error in console
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

    // Weather API key
    var apiKey = "e9d3c600773e0277e03e42289aeaf483";

    // Creates weather widget and then gets all posts with matching city name
    function createWeatherWidget() {
        $.ajax({
            url: 'https://cryptic-castle-96421.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=' + crd.latitude + '&lon=' + crd.longitude + '&units=imperial&appid=' + apiKey,
            method: "GET"

        }).then(function (response) {

            var weatherCityId = response.id;

            $('#openweathermap-widget-15').empty();
            window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
            window.myWidgetParam.push({ id: 15, cityid: weatherCityId, appid: '945c3adf4a846dc18d8b8ed754fe7142', units: 'imperial', containerid: 'openweathermap-widget-15', });
            (function () {
                var script = document.createElement('script');
                script.async = true;
                script.charset = "utf-8";
                script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);

                cityName = response.name;
                // remove loader
                $("#loader").slideUp('slow');

                getPosts();
            })();
        });
    }
});
//$(function() {
//GLOBAL VARIABLES AND CONSTANTS
const API_KEY = 'a0644fddc5d5dbb6f9d0afa73d298677';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
let weatherData;

//Cache DOM elements:
const $city = $('#city')
const $temperature = $('#temperature')
const $feelsLike = $('#feels-like')
const $weather = $('#weather')
const $input = $('input[type=text]')
const $getWeather = $('input[type=submit]')
const $form = $('form');

$form.on('submit', handleWeatherData);

function handleWeatherData (evt) {
    evt.preventDefault();
    let cityName = $input.val();
    $input.val('');
    $.ajax(`${BASE_URL}weather?q=${cityName}&appid=${API_KEY}`).then(function(data) {
        weatherData = data;
        renderTemplate();
    }, function(error){
        console.log('error- something fancy later');
    });

    function renderTemplate() {
        $city.text(`Weather For: ${weatherData.name}`);
        $temperature.text(`Temperature: ${kToF(weatherData.main.temp)}`).append('&#176; F');
        $feelsLike.text(`Feels Like: ${kToF(weatherData.main.feels_like)}`).append('&#176; F');
        $weather.text(`Weather: ${weatherData.weather[0].description}`)

    }

}

    function kToF(kTemperature) {
        return Math.round((parseInt(kTemperature) - 273.25) * 9/5 + 32);
    }


    




//});
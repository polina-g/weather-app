$(function() {
//GLOBAL VARIABLES AND CONSTANTS
const API_KEY = 'a0644fddc5d5dbb6f9d0afa73d298677';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const BASE_URL_FORECAST = 'https://api.openweathermap.org/data/2.5/'
let cityData;
let weatherData;
let lat;
let lon; 

//Cache DOM elements:
//Elements to insert API data:
const $city = $('.city')
const $temperature = $('.temperature')
const $feelsLike = $('.feels-like')
const $weather = $('.weather')
const $day = $('.day');
const $weatherContainer = $('.weather-result-container');

//Elements to grab user input
const $input = $('input[type=text]')
const $forecastDays = $('select')

//Elements for event listeners
const $form = $('form');

$form.on('submit', handleWeatherData);

function handleWeatherData (evt) {
    $('.clone').remove();

    evt.preventDefault();
    //Call current weather API to determine the lat and lon of the requested location
    let cityName = $input.val();
    $input.val('');
    $.ajax(`${BASE_URL}weather?q=${cityName}&appid=${API_KEY}&units=imperial`).then(function(data) {
        cityData = data;
        lat = parseInt(cityData.coord.lat);
        lon = parseInt(cityData.coord.lon);
        console.log("lat = " + lat, "lon = " + lon)

        let forecastDays = parseInt($forecastDays.val());

        //Call OneCall API with determined lat and lon
        $.ajax(`${BASE_URL_FORECAST}onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${API_KEY}`).then(function(data) {
            weatherData = data;
            renderTemplate(forecastDays);
        }, function(error){
            console.log('error weather- something fancy later');
        });
    }, function(error){
        console.log('error city - something fancy later');
    });

 


    function renderTemplate(days) {
          for (let i = 0; i < days; i++) {
            //loading current weather
            if (i === 0) {
                $city.siblings().text(`${cityData.name}`);
                $day.siblings().text(`Currently: ${getDate(weatherData.current.dt)}`)
                $temperature.siblings().text(`${weatherData.current.temp}`).append('&#176; F');
                $feelsLike.siblings().text(`${weatherData.current.feels_like}`).append('&#176; F');
                $weather.siblings().text(`${weatherData.current.weather[0].description}`)
            } else {
                $weatherContainer.clone().addClass('clone').appendTo('#result-container');
                $('.day').last().siblings().text(`${getDate(weatherData.daily[i].dt)}`)
                $('.temperature').last().siblings().text(`${weatherData.daily[i].temp.day}`).append('&#176; F');
                $('.feels-like').last().siblings().text(`${weatherData.daily[i].feels_like.day}`).append('&#176; F');
                $('.weather').last().siblings().text(`${weatherData.daily[i].weather[0].description}`)
                }
            }
        }
    
}

function getDate (timeStamp) {
    let date = new Date(timeStamp*1000);
   return date.toDateString()
}


});
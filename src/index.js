import '../css/styles.css';
import WeatherService from './weather-service.js'


// UI Logic

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  let promise = WeatherService.getWeather(city);
  promise.then(function (weatherDataArray) {
    printElements(weatherDataArray);
  }, function (errorArray) {
    printError(errorArray);
  });
}

function printElements(data) {
  document.querySelector('#showResponse').innerText = `The humidity in ${data[1]} is ${data[0].main.humidity}%.
  The temperature in Kelvins is ${data[0].main.temp} degrees.`;
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});

// function handleFormSubmission(event) {
//   event.preventDefault();

//   const city = document.querySelector('#city').value;
//   const state = document.querySelector('#state').value;
//   const country = document.querySelector('#country').value

//   document.querySelector('#city').value = null;
//   document.querySelector('#state').value = null;
//   document.querySelector('#country').value = null;
//   getWeather(city, state, country);
// }
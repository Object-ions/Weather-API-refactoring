// Business Logic

function getWeather(city, state, country) {
  let request = new XMLHttpRequest();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country},&appid=${process.env.API_KEY}&units=imperial`

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, city, state, country);
     } else {
      printError(this, response, city);
     }
});

  request.open("GET", url, true);
  request.send();
}

// UI Logic

function printError(request, apiResponse, city){
  document.querySelector('#showResponse').innerText = `There was an error ${city}: ${request.status} ${request.statusText}: $(apiResponse.message)`;
}

function printElements(apiResponse, city, state, country){
  document.querySelector('#showResponse').innerText = `The humidity in ${city}, ${state}, ${country} is ${apiResponse.main.humidity}%. The temperature in Fahrenheit is ${apiResponse.main.temp} degrees. The wind speed in ${city} is ${apiResponse.wind.speed} mph with gusts of ${apiResponse.wind.gust} mph`;

}
//tertirary operator, fix the commas.


function handleFormSubmission(event){
  event.preventDefault();

const city = document.querySelector('#city').value;
const state = document.querySelector('#state').value;
const country = document.querySelector('#country').value

document.querySelector('#city').value = null;
document.querySelector('#state').value = null;
document.querySelector('#country').value = null;
getWeather(city, state, country);
}

window.addEventListener("load", function(){
  document.querySelector('form').addEventListener('submit', handleFormSubmission);
});


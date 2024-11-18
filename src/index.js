function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon")

    timeElement.innerHTML = formateDate(date);
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    descriptionElement.innerHTML = response.data.condition.description;
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon">`
  
   getForecast(response.data.city);

}


   function formateDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let day = days[date.getDay()];

if (minutes < 10) {
    minutes = `0${minutes}`;
}
if (hours <10) {
    hours = `0${hours}`;
}
    
    return `${day} ${hours}:${minutes}`;
}

   function searchCity(city) {
    let apiKey = "e10304dcb3a23oc6fa4fbe32t589a6ae";
    let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = "e10304dcb3a23oc6fa4fbe32t589a6ae";
  let apiUrl =`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  }

function displayForecast(response) {
    
    let forecastHtml ="";

    response.data.daily.forEach(function (day, index) {
        
        if (index < 5) {
        
        forecastHtml = forecastHtml + 
        `
                <div class="weather-forecast-day">
                 <div class="weather-forecast-date"> ${formatDay(day.time)} </div>

                 <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
            
                 <div class="weather-forecast-temperatures">
                    <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
                    <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
                 </div>
             </div>`;
        }
    });
    
    
             let forecastElement = document.querySelector("#forecast"); 
             forecastElement.innerHTML = forecastHtml;     
    }

let searchElement =document.querySelector("#search-form");
searchElement.addEventListener("submit",handleSearchSubmit);

searchCity("Paris");
displayForecast();
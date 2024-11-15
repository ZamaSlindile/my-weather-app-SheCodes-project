function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);

    timeElement.innerHTML = formateDate(date);
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    descriptionElement.innerHTML = response.data.condition.description;
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
   }

function formateDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let day = days[date.getDay()];

if (minutes < 10) {
    minutes = `0:(minutes)`;
}
    
    return `${day} ${hours}:${minutes}`;
}

   function searchCity(city) {
    let apiKey = "e10304dcb3a23oc6fa4fbe32t589a6ae";
    let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}

let searchElement =document.querySelector("#search-form");
searchElement.addEventListener("submit",handleSearchSubmit);

searchCity("Paris");

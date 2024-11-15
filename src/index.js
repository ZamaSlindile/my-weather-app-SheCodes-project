function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");

    cityElement.innerHTML= response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
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

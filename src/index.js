import "./styles.css";
import { fetchDataFromAPI, changeUnit } from "/src/DOM.js";

const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search");

const celsiusBtn = document.querySelector("#celsius-btn");
const fahrenheitBtn = document.querySelector("#fahrenheit-btn");


// Clear old weather data before displaying new data
function clearWeatherData() {
    document.querySelector(".city").innerHTML = "";
    document.querySelector(".details").innerHTML = "";
    document.querySelector(".right-side").innerHTML = "";

    document.querySelector(".humidity").innerHTML = "<p> &#128167; HUMIDITY</p>";
    document.querySelector(".wind").innerHTML = "<p> &#128168; WIND</p>";
    document.querySelector(".visibility").innerHTML = "<p> &#128065; VISIBILITY</p>";
    document.querySelector(".pressure").innerHTML = "<p> &#x1F550; PRESSURE</p>";

    document.querySelector(".days").innerHTML = "";
}


// Make input lowercase while typing
searchInput.addEventListener("input", () => {
    searchInput.value = searchInput.value.toLowerCase();
});


// Press Enter to search
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});


// Search button
searchBtn.addEventListener("click", () => {
    const location = searchInput.value.trim();
    if (location) {
        clearWeatherData();
        fetchDataFromAPI(location);
    }
});


// Celsius button
celsiusBtn.addEventListener("click", () => {
    celsiusBtn.classList.add("clicked");
    fahrenheitBtn.classList.remove("clicked");

    changeUnit("celsius");

});


// Fahrenheit button
fahrenheitBtn.addEventListener("click", () => {
    fahrenheitBtn.classList.add("clicked");
    celsiusBtn.classList.remove("clicked");

    changeUnit("fahrenheit");

});


// Load default weather
fetchDataFromAPI("london");
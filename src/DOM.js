import sunIcon from "./assets/sun.png";
import halfCloudyIcon from "./assets/half-cloudy.png";
import cloudyIcon from "./assets/cloudy.png";
import rainyDayIcon from "./assets/rainy-day.png";
import snowIcon from "./assets/snow.png";
import rainThunderIcon from "./assets/rain-thunder.png";
import lightningStormIcon from "./assets/lightning-storm.png";

const API_KEY = process.env.API_KEY;

let currentUnit = "fahrenheit";
let currentWeatherData = null;

// Map the Visual Crossing "icon" field to one of our local icon images.
// Full list of possible values: https://www.visualcrossing.com/resources/documentation/weather-api/defining-icon-set-in-the-weather-api/
const ICON_MAP = {
    "clear-day": sunIcon,
    "clear-night": halfCloudyIcon,
    "partly-cloudy-day": halfCloudyIcon,
    "partly-cloudy-night": halfCloudyIcon,
    "cloudy": cloudyIcon,
    "wind": cloudyIcon,
    "fog": cloudyIcon,
    "rain": rainyDayIcon,
    "showers-day": rainyDayIcon,
    "showers-night": rainyDayIcon,
    "snow": snowIcon,
    "snow-showers-day": snowIcon,
    "snow-showers-night": snowIcon,
    "thunder-rain": rainThunderIcon,
    "thunder-showers-day": lightningStormIcon,
    "thunder-showers-night": lightningStormIcon,
};

function getIconForCondition(icon) {
    return ICON_MAP[icon] || cloudyIcon;
}

// Convert temperature
function convertTemperature(temp) {
    if (currentUnit === "celsius") {
        return ((temp - 32) * 5 / 9).toFixed(1);
    }

    return temp.toFixed(1);
}

// Change unit and rebuild UI
function changeUnit(unit) {
    currentUnit = unit;

    if (currentWeatherData) {
        clearDOM();
        renderWeather(currentWeatherData);
    }
}

// Remove old UI
function clearDOM() {
    document.querySelector(".city").innerHTML = "";
    document.querySelector(".details").innerHTML = "";
    document.querySelector(".right-side").innerHTML = "";

    document.querySelector(".humidity").innerHTML =
        "<p> &#128167; HUMIDITY</p>";

    document.querySelector(".wind").innerHTML =
        "<p> &#128168; WIND</p>";

    document.querySelector(".visibility").innerHTML =
        "<p> &#128065; VISIBILITY</p>";

    document.querySelector(".pressure").innerHTML =
        "<p> &#x1F550; PRESSURE</p>";

    document.querySelector(".days").innerHTML = "";
}

// Render everything
function renderWeather(weatherData) {
    buildLocationElement(weatherData);
    buildIconElement(weatherData);
    buildDetailsElement(weatherData);
    buildTempElement(weatherData);
    buildHumidityElement(weatherData);
    buildWindElement(weatherData);
    buildVisibilityElement(weatherData);
    buildPressureElement(weatherData);
    buildForecastElement(weatherData);
}

function buildLocationElement(weatherData) {
    const cityDiv = document.querySelector(".city");
    const h3 = document.createElement("h3");

    let location = weatherData.address;
    let result = location[0].toUpperCase() + location.slice(1);

    h3.textContent = `📍 ${result}`;

    cityDiv.appendChild(h3);
}

function buildIconElement(weatherData) {
    const img = document.querySelector("#weather-icon");
    img.src = getIconForCondition(weatherData.currentConditions.icon);
    img.alt = weatherData.currentConditions.conditions;
}

function buildDetailsElement(weatherData) {
    const detailsDiv = document.querySelector(".details");
    const h3 = document.createElement("h3");
    h3.textContent = weatherData.currentConditions.conditions;

    const p = document.createElement("p");
    p.textContent =
        `Feels like ${convertTemperature(weatherData.currentConditions.feelslike)}°${currentUnit === "celsius" ? "C" : "F"}. UV index: ${weatherData.currentConditions.uvindex}.`;


    detailsDiv.append(h3, p);
}

function buildTempElement(weatherData) {
    const rightSideDiv = document.querySelector(".right-side");
    const p = document.createElement("p");
    p.textContent =
        `${convertTemperature(weatherData.currentConditions.temp)}°${currentUnit === "celsius" ? "C" : "F"}`;

    rightSideDiv.appendChild(p);
}

function buildHumidityElement(weatherData) {
    const div = document.querySelector(".humidity");
    const p = document.createElement("p");
    p.textContent =
        `${weatherData.currentConditions.humidity}%`;

    div.appendChild(p);
}

function buildWindElement(weatherData) {
    const div = document.querySelector(".wind");
    const p = document.createElement("p");
    p.textContent =
        `${weatherData.currentConditions.windspeed} km/h`;

    div.appendChild(p);
}

function buildVisibilityElement(weatherData) {
    const div = document.querySelector(".visibility");
    const p = document.createElement("p");

    p.textContent =
        `${weatherData.currentConditions.visibility} km`;

    div.appendChild(p);
}

function buildPressureElement(weatherData) {
    const div = document.querySelector(".pressure");
    const p = document.createElement("p");
    p.textContent =
        `${weatherData.currentConditions.pressure} hPa`;

    div.appendChild(p);
}

function buildForecastElement(weatherData) {
    const daysDiv = document.querySelector(".days");
    const firstFiveDays = weatherData.days.slice(0, 5);
    firstFiveDays.forEach(day => {
        const daysItem = document.createElement("div");
        daysItem.classList.add("days-item");

        const pDay = document.createElement("p");
        pDay.textContent =
            new Date(day.datetime).toLocaleDateString("en-US", {
                weekday: "short"
            });

        const img = document.createElement("img");
        img.classList.add("day-icon");
        img.src = getIconForCondition(day.icon);
        img.alt = day.conditions;

        const pTempDay = document.createElement("p");
        pTempDay.textContent =
            `${convertTemperature(day.tempmax)}°${currentUnit === "celsius" ? "C" : "F"}`;

        const pTempNight = document.createElement("p");
        pTempNight.textContent =
            `${convertTemperature(day.tempmin)}°${currentUnit === "celsius" ? "C" : "F"}`;

        daysItem.append(
            pDay,
            img,
            pTempDay,
            pTempNight
        );
        daysDiv.appendChild(daysItem);
    });
}

async function fetchDataFromAPI(location = "london") {
    try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=hours%2Ccurrent%2Cdays&key=${API_KEY}&contentType=json`
        );

        const weatherData = await response.json();
        console.log(weatherData);

        // save data
        currentWeatherData = weatherData;

        // render
        renderWeather(weatherData);
    } catch(error) {
        console.error(error);
    }
}

export {
    fetchDataFromAPI,
    changeUnit
};
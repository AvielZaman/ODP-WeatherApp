const API_KEY = process.env.API_KEY

function buildLocationElement(weatherData) {
    const cityDiv = document.querySelector(".city");
    const h3 = document.createElement("h3");

    let location = weatherData.address;
    let result = location[0].toUpperCase() + location.slice(1);

    h3.textContent = `📍 ${result}`;

    cityDiv.appendChild(h3);
}

function buildDetailsElement(weatherData) {
    const detailsDiv = document.querySelector(".details");
    const h3 = document.createElement("h3");
    h3.textContent = weatherData.currentConditions.conditions;

    const p = document.createElement("p");
    p.textContent = `Feels like ${weatherData.currentConditions.feelslike}°F. UV index: ${weatherData.currentConditions.uvindex}.`;

    detailsDiv.append(h3, p);
}


function buildTempElement(weatherData) {
    const rightSideDiv = document.querySelector(".right-side");
    const p = document.createElement("p");
    p.textContent = `${weatherData.currentConditions.temp}°F`;

    rightSideDiv.appendChild(p);
}

function buildHumidityElement(weatherData) {
    const humidityDiv = document.querySelector(".humidity");
    const p = document.createElement("p");
    p.textContent = `${weatherData.currentConditions.humidity}%`;

    humidityDiv.appendChild(p);
}

function buildWindElement(weatherData) {
    const windDiv = document.querySelector(".wind");
    const p = document.createElement("p");
    p.textContent = `${weatherData.currentConditions.windspeed} km/h`;

    windDiv.appendChild(p);
}

function buildVisibilityElement(weatherData) {
    const visibilityDiv = document.querySelector(".visibility");
    const p = document.createElement("p");
    p.textContent = `${weatherData.currentConditions.visibility} km`;

    visibilityDiv.appendChild(p);
}

function buildPressureElement(weatherData) {
    const pressureDiv = document.querySelector(".pressure");
    const p = document.createElement("p");
    p.textContent = `${weatherData.currentConditions.pressure} hPa`;

    pressureDiv.appendChild(p);
}

function buildForecastElement(weatherData) {
    const daysDiv = document.querySelector(".days");
    const firstFiveDays = weatherData.days.slice(0, 5);

    firstFiveDays.forEach(day => {
        const daysItem = document.createElement("div");
        daysItem.classList.add("days-item");
         const pDay = document.createElement("p");

         // transalte the date into a short day name 
        const dayName = new Date(day.datetime).toLocaleDateString("en-US", {
            weekday: "short"
        });

        pDay.textContent = dayName;

        const img = document.createElement("img");
        img.id = "icon";

        const pTempDay = document.createElement("p");
        pTempDay.textContent = `${day.tempmax}℃`;
        
        const pTempNight = document.createElement("p");
        pTempNight.textContent = `${day.tempmin}℃`;

        daysItem.append(pDay,img,pTempDay,pTempNight);
        daysDiv.appendChild(daysItem);
    });
}

async function fetchDataFromAPI() {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?unitGroup=us&include=hours%2Ccurrent%2Cdays&key=${API_KEY}&contentType=json`);
        const weatherData = await response.json();
        console.log(weatherData);

        buildLocationElement(weatherData);
        buildDetailsElement(weatherData);
        buildTempElement(weatherData);
        buildHumidityElement(weatherData);
        buildWindElement(weatherData);
        buildVisibilityElement(weatherData);
        buildPressureElement(weatherData);
        buildForecastElement(weatherData)
    } catch (error) {
        console.error(error);
    }
}

export default fetchDataFromAPI;
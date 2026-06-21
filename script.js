const API_KEY = "bcc3ddb6d79cff084a02e996d9988e65";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");
const message = document.getElementById("message");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const condition = document.getElementById("condition");
const weatherIcon = document.getElementById("weatherIcon");

async function getWeather(city) {

    try {

        message.innerHTML =
            "<p class='loading'>Loading weather data...</p>";

        weatherCard.classList.add("hidden");

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

        message.innerHTML = "";

    } catch (error) {

        weatherCard.classList.add("hidden");

        message.innerHTML =
            `<p class="error">${error.message}</p>`;

        console.error(error);
    }
}

function displayWeather(data) {

    cityName.textContent =
        `${data.name}, ${data.sys.country}`;

    temperature.textContent =
        `${data.main.temp} °C`;

    humidity.textContent =
        `${data.main.humidity}%`;

    wind.textContent =
        `${data.wind.speed} m/s`;

    condition.textContent =
        data.weather[0].description;

    const iconCode =
        data.weather[0].icon;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherCard.classList.remove("hidden");
}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city === "") {

        message.innerHTML =
            "<p class='error'>Please enter a city name.</p>";

        return;
    }

    getWeather(city);
});

cityInput.addEventListener("keyup", (event) => {

    if (event.key === "Enter") {
        searchBtn.click();
    }
});

window.addEventListener("load", () => {
    getWeather("Mumbai");
});
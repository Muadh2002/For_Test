const API_KEY = '6f3860e91d49224ae7a7d91aadc39fc3';

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

document.getElementById('city-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('search-btn').click();
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        
        if (data.cod === 200) {
            displayWeather(data);
        } else {
            alert('City not found!');
        }
    } catch (error) {
        alert('Error fetching weather data');
    }
}

function displayWeather(data) {
    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind: ${data.wind.speed} m/s`;
    
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weather-icon').innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
}

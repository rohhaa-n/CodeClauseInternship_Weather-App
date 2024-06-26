const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');   

async function checkWeather(city){
    const api_key = "d5098314a3eafb58092e3e15a976dbaa";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === `404`){
        location_not_found.style.display ="flex";
        weather_body.style.display = "none";
        return;
    }
    weather_body.style.display = "flex";
    location_not_found.style.display ="none";
    temperature.innerHTML = `${Math.round(weather_data.main.temp-273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Kmph`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "imgs/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "imgs/clear.png";
            break;
        case 'Rain':
            weather_img.src = "imgs/rain.png";
            break;
        case 'Mist':
            weather_img.src = "imgs/mist.png";
            break;
        case 'Thunderstorm':
            weather_img.src = "imgs/thunderstorm.png";
            break;
    }
}
searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});
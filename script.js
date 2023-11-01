document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchBox = document.getElementById('search-box');
  const weatherResult = document.getElementById('weather-result');
  const location = searchBox.value.trim();

  if (!location) {
      return;
  }

  try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=03a094de2fbed757402784c8ab602833`);
      const data = await response.json();

      if (data.cod === '404') {
          weatherResult.textContent = 'Location not found.';
      } else {
          const temp = Math.round(data.main.temp - 273.15);
          const weather = data.weather[0].description;
          weatherResult.textContent = `Current weather in ${location} is ${weather} with a temperature of ${temp}°C.`;
      }
  } catch (error) {
      console.error('Error:', error);
      weatherResult.textContent = 'Failed to fetch weather data.';
  }
});
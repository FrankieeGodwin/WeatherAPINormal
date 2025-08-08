async function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) return;

  const API_KEY = 'd9a819aad5d003b36408799ae9b0300e';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
    document.getElementById('weatherDisplay').innerHTML = '';
  }
}

function displayWeather(weather) {
  document.getElementById('weatherDisplay').innerHTML = `
    <h2 class="text-2xl font-bold mb-4">${weather.name}</h2>
    <table class="table-auto border-collapse border-4 border-gray-500 mx-auto">
      <thead>
        <tr>
          <th class="border-4 border-gray-500 px-4 py-2">Parameter</th>
          <th class="border-4 border-gray-500 px-4 py-2">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="border-4 border-gray-500 px-4 py-2">Condition</td><td class="border-4 border-gray-500 px-4 py-2">${weather.weather[0].main} - ${weather.weather[0].description}</td></tr>
        <tr><td class="border-4 border-gray-500 px-4 py-2">Temperature</td><td class="border-4 border-gray-500 px-4 py-2">${weather.main.temp}°C</td></tr>
        <tr><td class="border-4 border-gray-500 px-4 py-2">Humidity</td><td class="border-4 border-gray-500 px-4 py-2">💧 ${weather.main.humidity}%</td></tr>
        <tr><td class="border-4 border-gray-500 px-4 py-2">Wind Speed</td><td class="border-4 border-gray-500 px-4 py-2">🌬️ ${weather.wind.speed} m/s</td></tr>
        <tr><td class="border-4 border-gray-500 px-4 py-2">Feels Like</td><td class="border-4 border-gray-500 px-4 py-2">${weather.main.feels_like}°C</td></tr>
        <tr><td class="border-4 border-gray-500 px-4 py-2">Pressure</td><td class="border-4 border-gray-500 px-4 py-2">${weather.main.pressure} hPa</td></tr>
        <tr><td class="border-4 border-gray-500 px-4 py-2">Sunrise</td><td class="border-4 border-gray-500 px-4 py-2">${new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</td></tr>
        <tr><td class="border-4 border-gray-500 px-4 py-2">Sunset</td><td class="border-4 border-gray-500 px-4 py-2">${new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</td></tr>
        <tr><td class="border-4 border-gray-500 px-4 py-2">Clouds</td><td class="border-4 border-gray-500 px-4 py-2">${weather.clouds.all}%</td></tr>
      </tbody>
    </table>
  `;
}

const apiKey = 'c1e2579810454161a8b53640240712'; // ضع مفتاح API الخاص بك هنا  
const todayWeather = document.getElementById('todayWeather');
const tomorrowWeather = document.getElementById('tomorrowWeather');
const dayAfterTomorrowWeather = document.getElementById('dayAfterTomorrowWeather');
getWeatherData('aleppo')

document.getElementById('getWeatherBtn').onclick = function () {
  const city = document.getElementById('cityInput').value;
  if (city) {
    getWeatherData(city);
  } else {
    alert("يرجى إدخال اسم المدينة.");
  }
};

function getWeatherData(city) {
  const apiURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('خطأ في جلب بيانات الطقس:', error);
    });
}

function displayWeather(data) {
  // عرض اليوم  
  const today = data.forecast.forecastday[0];
  document.getElementById('todayCity').textContent = data.location.name;
  document.getElementById('todayTemp').textContent = `${today.day.avgtemp_c}°C`;
  document.getElementById('todayCondition').textContent = today.day.condition.text;
  document.getElementById('todayIcon').innerHTML = `<img src="https:${today.day.condition.icon}" alt="${today.day.condition.text}">`;
  document.getElementById('todayDate').textContent = new Date(today.date).toLocaleDateString('ar-EG', { weekday: 'long' });
console.log(today);

  // عرض الغد  
  const tomorrow = data.forecast.forecastday[1];
  document.getElementById('tomorrowTemp').textContent = `${tomorrow.day.avgtemp_c}°C`;
  document.getElementById('tomorrowCondition').textContent = tomorrow.day.condition.text;
  document.getElementById('tomorrowIcon').innerHTML = `<img src="https:${tomorrow.day.condition.icon}" alt="${tomorrow.day.condition.text}">`;
  document.getElementById('tomorrowWeather').querySelector('.header').innerHTML += `<span>${new Date(tomorrow.date).toLocaleDateString('ar-EG', { weekday: 'long' })}</span>`;

  // عرض بعد الغد  
  const dayAfterTomorrow = data.forecast.forecastday[2];
  document.getElementById('dayAfterTomorrowTemp').textContent = `${dayAfterTomorrow.day.avgtemp_c}°C`;
  document.getElementById('dayAfterTomorrowCondition').textContent = dayAfterTomorrow.day.condition.text;
  document.getElementById('dayAfterTomorrowIcon').innerHTML = `<img src="https:${dayAfterTomorrow.day.condition.icon}" alt="${dayAfterTomorrow.day.condition.text}">`;
  document.getElementById('dayAfterTomorrowWeather').querySelector('.header').innerHTML += `<span>${new Date(dayAfterTomorrow.date).toLocaleDateString('ar-EG', { weekday: 'long' })}</span>`;
}
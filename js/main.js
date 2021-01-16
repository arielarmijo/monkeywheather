const apiKey = '72216e8ac7dc0f927f7aa3d9b2af7c3f';






async function getWeather(city){
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
  const response = await api_call.json();
  document.getElementById('weatherImage').src=`http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
  console.log(response);
}


function getWeatherButton(){
  const city = document.getElementById('cityInput').value;
  getWeather(city);
}




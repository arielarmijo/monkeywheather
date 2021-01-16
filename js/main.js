const apiKey = 'd47bc5e52c9b46f24443d3c321a13ddc';
const city = 'London';

async function getWeather(){
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
  debugger
  const response = await api_call.json();

  document.getElementById('weatherImage').src=`http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
  console.log(response);
}


const apiKey = '72216e8ac7dc0f927f7aa3d9b2af7c3f';

fahrenheitInCelsius = k => Math.floor(k-273.15);

async function getWeather(city){
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
  const response = await api_call.json();
  const api_call_forecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
  const responseForecast = await api_call_forecast.json();

  document.getElementById('weatherImage').src=`http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
  document.getElementById('description').innerHTML=response.weather[0].description;
  document.getElementById('temp_max').innerHTML=response.main.temp_max;
  document.getElementById('temp_min').innerHTML=response.main.temp_min;
  console.log(response);
  console.log(responseForecast);
  var trace = { 
    x: responseForecast.list.filter((record,index)=>{
      if (index%8===0 )
        return record
    }).map(record=>record.dt_txt),        
    y: responseForecast.list.filter((record,index)=>{
      if (index%8===0 )
        return record
    }).map(record=>fahrenheitInCelsius(record.main.temp)),      
    mode: 'line'    
  };
  console.log(trace)
  Plotly.newPlot('myDiv', [trace]);
}


function getWeatherButton(){
  const city = document.getElementById('cityInput').value;
  getWeather(city);
}




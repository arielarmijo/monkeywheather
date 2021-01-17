const apiKey = '72216e8ac7dc0f927f7aa3d9b2af7c3f';
const date = moment()

fahrenheitInCelsius = k => Math.floor(k-273.15);

async function getWeather(city){
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
  const response = await api_call.json();
  const api_call_forecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
  const responseForecast = await api_call_forecast.json();


  document.getElementById('time').innerHTML= moment.unix(response.dt).format('DD-MM-YYYY');

  document.getElementById('weatherImage').src=`http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
  document.getElementById('description').innerHTML=response.weather[0].description;
  document.getElementById('temp_max').innerHTML=response.main.temp_max;
  document.getElementById('temp_min').innerHTML=response.main.temp_min;
  document.getElementById('city').innerHTML=response.name;
  console.log(response);
  console.log(responseForecast);
  var trace = { 
    x: responseForecast.list.filter((record,index)=>{
      if (index%8===0 )
        return record
    }).map(record=>record.dt_txt.substring(0,10)),        
    y: responseForecast.list.filter((record,index)=>{
      if (index%8===0 )
        return record
    }).map(record=>fahrenheitInCelsius(record.main.temp)),      
    text: responseForecast.list.filter((record,index)=>{
      if (index%8===0 )
        return record
    }).map(record=>fahrenheitInCelsius(record.main.temp)),
    textposition: 'auto',
    cliponaxis: false,
    type: 'bar',   
    marker: {
      color: '#5b9aa0'
    }, 
  };

  var config={
    displayModeBar: false, // this is the line that hides the plotly bar.
  }

  console.log(trace)
  Plotly.newPlot(
    'myDiv', 
    [trace],
    {
    title: 'Forecast del tiempo para los próximos dias',
    showlegend: true,
    margin: 
      {
        l: 50,
        r: 50,
        b: 60,
        t: 40,
      },
    hovermode: false,
    },
    config
  );



}


function getWeatherButton(){
  const city = document.getElementById('cityInput').value;
  getWeather(city);
}




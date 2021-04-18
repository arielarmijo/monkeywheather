const apiKey = '72216e8ac7dc0f927f7aa3d9b2af7c3f';
const date = moment()

fahrenheitInCelsius = k => Math.floor(k-273.15);

async function getWeather(city){
  moment.locale('es')
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=sp&appid=${apiKey}`);
  const response = await api_call.json();
  const api_call_forecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=sp&appid=${apiKey}`)
  const responseForecast = await api_call_forecast.json();
  const iconsArray = plotForecastIcons(responseForecast)

  renderForecast(iconsArray)
  document.getElementById('time').innerHTML= moment.unix(response.dt).format("dddd, MMMM Do YYYY, h:mm:ss a")
  document.getElementById('weatherImage').src=`http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
  document.getElementById('description').innerHTML=response.weather[0].description;
  document.getElementById('temp_max').innerHTML='Temperatura máxima: ' +  response.main.temp_max + 'ºC';
  document.getElementById('temp_min').innerHTML='Temperatura mínima: ' +  response.main.temp_min + 'ºC' ;
  document.getElementById('city').innerHTML=response.name;


  console.log(response);
  console.log(responseForecast);
  var tempMax = { 
    x: responseForecast.list.filter((record,index)=>{
      if (index%8===0 )
        return record
    }).map(record=>record.dt_txt.substring(0,10)),        
    y: responseForecast.list.filter((record,index)=>{
      if (index%8===0 )
        return record
    }).map(record=>record.main.temp_max),      
    text: responseForecast.list.filter((record,index)=>{
      if (index%8===0 )
        return record
    }).map(record=>record.main.temp_max),
    textposition: 'auto',
    cliponaxis: false,
    type: 'line',   
    marker: {
      color: '#5b9aa0'
    }, 
    name:'Temperatura máxima'
  };

  var tempMin = { 
    x: responseForecast.list.filter((record,index)=>{
      if (index%8===0 )
        return record
    }).map(record=>record.dt_txt.substring(0,10)),        
    y: responseForecast.list.filter((record,index)=>{
      if (index%8===0 )
        return record
    }).map(record=>record.main.temp_min),      
    text: responseForecast.list.filter((record,index)=>{
      if (index%8===0 )
        return record
    }).map(record=>record.main.temp_min),
    textposition: 'auto',
    cliponaxis: false,
    type: 'line',   
    marker: {
      color: '#622569'
    }, 
    name:'Temperatura mínima'
  };

  var layout = {
    width: 480,
    height: 250,
    // title: 'Forecast del tiempo para los próximos dias',
    showlegend: true,
    margin: 
      {
        l: 50,
        r: 50,
        b: 60,
        t: 40,
      },
    hovermode: false,
    }

  var config={
    displayModeBar: false, // this is the line that hides the plotly bar.
  }

  Plotly.newPlot(
    'myDiv', 
    [tempMax,tempMin],
    layout,
    config
  );

}


function getWeatherButton(){
  const city = document.getElementById('cityInput').value;
  city !=='' ? getWeather(city): getWeather('Santiago') ;
}

function plotForecastIcons(forecastObj){
  iconsArray = forecastObj.list.filter((record,index)=>index%8===0).map(record=>{
    return({
      icon:record.weather[0].icon,
      dt: moment.unix(record.dt).format("dddd, DD"),
      description:record.weather[0].description,
      tempMax: record.main.temp_max,
      tempMin: record.main.temp_min
    })
    
  })
  return iconsArray
}

function renderForecast(forecastArray){
  for (i=0;i<5;i++){
    document.getElementById('fore'+i.toString()).src=`http://openweathermap.org/img/wn/${forecastArray[i].icon}@2x.png`
    document.getElementById('day'+i.toString()).innerHTML=forecastArray[i].dt
    document.getElementById('desc'+i.toString()).innerHTML=forecastArray[i].description
    document.getElementById('tempMax'+i.toString()).innerHTML='max: '+forecastArray[i].tempMax + 'ºC'
    document.getElementById('tempMin'+i.toString()).innerHTML='min: '+forecastArray[i].tempMin + 'ºC'
  }
 

}



import { api} from "./api.js";

document.addEventListener('DOMContentLoaded', async function () {

    document.getElementById("getWeather").addEventListener("click", async function () {
        
        let city = document.getElementById('cityInput').value;
        
        let urlWeather = new URL(api.weather + "weather");
        urlWeather.searchParams.set("q", city);
        urlWeather.searchParams.set("units", "metric");
        urlWeather.searchParams.set("appid", api.key);
        let responseWeather = await fetch(urlWeather);
        let data = await responseWeather.json();
        console.log(data);

        let time = moment.unix(data.dt).format('DD-MM-YYYY');
        let weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        let description = data.weather[0].description;
        let temp = data.main.temp;
        let tempMin = data.main.temp_min;
        let tempMax = data.main.temp_max;

        let response = await fetch("snippets/weathercard.html");
        let weatherCardTemplate = await response.text();
        weatherCardTemplate = weatherCardTemplate.replace("${{time}}", time);
        weatherCardTemplate = weatherCardTemplate.replace("${{city}}", city);
        weatherCardTemplate = weatherCardTemplate.replace("${{weatherIcon}}", weatherIcon);
        weatherCardTemplate = weatherCardTemplate.replace("${{description}}", description);
        weatherCardTemplate = weatherCardTemplate.replace("${{temp}}", temp);
        weatherCardTemplate = weatherCardTemplate.replace("${{temp_min}}", tempMin);
        weatherCardTemplate = weatherCardTemplate.replace("${{temp_max}}", tempMax);

        let weatherCard = document.getElementById("weatherInfo");
        weatherCard.innerHTML = weatherCardTemplate;

        let urlForecast = new URL(api.weather + "forecast/");
        urlForecast.searchParams.set("q", city);
        urlForecast.searchParams.set("units", "metric");
        urlForecast.searchParams.set("appid", api.key);
        const responseForecast = await fetch(urlForecast)
        const forecast = await responseForecast.json();
        console.log(forecast);
        
        var trace = {
            x: forecast.list.map(record => record.dt_txt),
            y: forecast.list.map(record => record.main.temp),
            type: 'scatter'
        };
        console.log(trace)
        Plotly.newPlot('graph', [trace]);

    });

});
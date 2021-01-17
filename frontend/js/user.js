import { api } from "./api.js";

document.addEventListener('DOMContentLoaded', async function () {

    var url = new URL(window.location);
    var userName = url.searchParams.get("user");

    let response = await fetch("snippets/navbar2.html");
    let navbar = await response.text();
    navbar = navbar.replace(/\$\{\{userName\}\}/g, userName);
    document.querySelector("nav").innerHTML = navbar;

    response = await fetch("snippets/usercard.html");
    let userCard = await response.text();
    userCard = userCard.replace("${{avatar}}", api.user + "user/" + userName + "/image");
    userCard = userCard.replace("${{saludo}}", `Bienvenido ${userName}`);
    document.getElementById("userCard").innerHTML = userCard;

    response = await fetch(api.user + "user/" + userName);
    let userData = await response.json();
    console.log(userData);

    if (userData.locations.length > 0) {
        makeCityDropDownList(userData);
        getCityWeather(document.querySelector("select").value);
    }

    response = await fetch("snippets/citysearch.html");
    let citySearch = await response.text();
    document.getElementById("citySearch").innerHTML = citySearch;

    document.getElementById("getWeatherBtn").addEventListener("click", async function () {
        let city = document.getElementById('cityInput').value;
        getCityWeather(city);

       


    });

    document.getElementById("saveCityBtn").addEventListener("click", async function () {

        if (document.getElementById('city')) {
            let city = document.getElementById('city').innerText;
            console.log(city);
            let response = fetch(`${api.user}user/${userName}/${city}`, {
                method: "PUT"
            })
                .then(response => {
                    console.log(response);
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(data => {
                    console.log(data);
                    if (data) {
                        makeCityDropDownList(data);
                    }

                });
        }

    });





});

async function makeCityDropDownList(userData) {
    var ciudades = document.querySelector("#ciudades");
    ciudades.innerHTML = "";
    var label = document.createElement("label");
    label.innerText = "Ciudades favoritas";
    label.classList.add("mb-2");
    var selectList = document.createElement("select");
    selectList.classList.add("form-control");
    userData.locations.forEach(e => {
        var option = document.createElement("option");
        option.value = e.city;
        option.text = e.city;
        selectList.appendChild(option);
    });
    selectList.addEventListener("change", async function (event) {
        getCityWeather(event.target.value);
    });
    ciudades.appendChild(label);
    ciudades.appendChild(selectList);
}

async function getCityWeather(city) {

    let weatherCard = document.getElementById("weatherCard");
    weatherCard.innerHTML = `<img class="mt-5" src="img/ajax-loader.gif" width="50" height="50"/>`;

    let urlWeather = new URL(api.weather + "weather");
    urlWeather.searchParams.set("q", city);
    urlWeather.searchParams.set("units", "metric");
    urlWeather.searchParams.set("appid", api.key);

    let response = await fetch("snippets/weathercard.html");
    let weatherCardTemplate = await response.text();

    fetch(urlWeather)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("ciudad no encontrada");
                weatherCard.innerHTML = "Ciudad no encontrada";
            }
        })
        .then(data => {
            console.log(data);
            if (data) {
                let time = moment.unix(data.dt).format('DD-MM-YYYY');
                let weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                weatherCardTemplate = weatherCardTemplate.replace("${{time}}", time);
                weatherCardTemplate = weatherCardTemplate.replace("${{city}}", data.name);
                weatherCardTemplate = weatherCardTemplate.replace("${{weatherIcon}}", weatherIcon);
                weatherCardTemplate = weatherCardTemplate.replace("${{description}}", data.weather[0].description);
                weatherCardTemplate = weatherCardTemplate.replace("${{temp}}", data.main.temp);
                weatherCardTemplate = weatherCardTemplate.replace("${{temp_min}}", data.main.temp_min);
                weatherCardTemplate = weatherCardTemplate.replace("${{temp_max}}", data.main.temp_max);
                weatherCard.innerHTML = weatherCardTemplate;
            }
        })
        .catch(err => console.log(err));


        let urlForecast = new URL(api.weather + "forecast/");
        //let city = document.getElementById('cityInput').value;
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
        console.log(trace);
        Plotly.newPlot('forecastCard', [trace]);

}



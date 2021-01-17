import { api } from "./api.js";
import { clearError } from "./utils.js";
import { showError } from "./utils.js";

const loadinIcon = `<img class="mt-5" src="img/ajax-loader.gif" width="25" height="25"/>`;

document.addEventListener('DOMContentLoaded', async function () {

    var url = new URL(window.location);
    var userName = url.searchParams.get("user");

    // Agrega navbar
    let response = await fetch("snippets/usernavbar.html");
    let navbar = await response.text();
    navbar = navbar.replace(/\$\{\{userName\}\}/g, userName);
    document.querySelector("nav").innerHTML = navbar;

    // Agrega datos de usuario
    response = await fetch("snippets/usercard.html");
    let userCard = await response.text();
    userCard = userCard.replace("${{avatar}}", `${api.user}/user/${userName}/image`);
    userCard = userCard.replace("${{saludo}}", `Bienvenido ${userName}`);
    document.getElementById("userCard").innerHTML = userCard;

    response = await fetch(`${api.user}/user/${userName}`);
    let userData = await response.json();
    console.log(userData);

    if (userData.locations.length > 0) {
        makeCityDropDownList(userData);
        getCityWeather(document.querySelector("select").value);
    }


    // Agrega el formulario para buscar tiempo de alguna ciudad
    response = await fetch("snippets/citysearch.html");
    let citySearch = await response.text();
    document.getElementById("citySearch").innerHTML = citySearch;

    let getWeatherBtn = document.getElementById("getWeatherBtn");
    let cityInput = document.getElementById("cityInput");

    cityInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            getWeatherBtn.click();
        }
    });

    getWeatherBtn.addEventListener("click", async function () {
        let city = document.getElementById('cityInput').value;
        getCityWeather(city);
    });

    // Guarda ciudad a favoritos
    document.getElementById("saveCityBtn").addEventListener("click", async function () {

        if (document.getElementById('city')) {
            let city = document.getElementById('city').innerText;
            console.log(city);
            let response = fetch(`${api.user}/user/${userName}/${city}`, {
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

    let errorDiv = document.getElementById("error");
    clearError(errorDiv);

    // Muestra ícono de loading
    let weatherCard = document.getElementById("weatherCard");
    weatherCard.innerHTML = loadinIcon;

    let response = await fetch("snippets/weathercard.html");
    let weatherCardTemplate = await response.text();

    // Recupera la información meterológica
    let urlWeather = new URL(`${api.weather}/weather`);
    urlWeather.searchParams.set("q", city);
    urlWeather.searchParams.set("units", "metric");
    urlWeather.searchParams.set("appid", api.key);

    fetch(urlWeather)
        .then(response => {
            if (response.ok) {

                return response.json();
            } else {
                console.log("ciudad no encontrada");
                weatherCard.innerHTML = "";
                showError(errorDiv, "Ciudad no encontrada");
            }
        })
        .then(data => {
            console.log(data);
            if (data) {
                let time = moment.unix(data.dt).format("dddd, MMMM Do YYYY, h:mm:ss a");
                let weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                weatherCardTemplate = weatherCardTemplate.replace("${{time}}", time);
                weatherCardTemplate = weatherCardTemplate.replace("${{city}}", data.name);
                weatherCardTemplate = weatherCardTemplate.replace("${{weatherIcon}}", weatherIcon);
                weatherCardTemplate = weatherCardTemplate.replace("${{description}}", data.weather[0].description);
                weatherCardTemplate = weatherCardTemplate.replace("${{temp}}", data.main.temp);
                weatherCardTemplate = weatherCardTemplate.replace("${{temp_min}}", data.main.temp_min);
                weatherCardTemplate = weatherCardTemplate.replace("${{temp_max}}", data.main.temp_max);
                weatherCard.innerHTML = weatherCardTemplate;
                getCityForecast(city);
            }
        })
        .catch(err => console.log(err));

}

async function getCityForecast(city) {

    // Muestra ícono de loading
    let forecastCard = document.getElementById("forecastCard");
    forecastCard.innerHTML = loadinIcon;

    let response = await fetch("snippets/forecastcard.html");
    let forecastCardTemplate = await response.text();
    forecastCard.innerHTML = forecastCardTemplate;


    // Recupera pronóstico del tiempo
    let urlForecast = new URL(`${api.weather}/forecast`);
    urlForecast.searchParams.set("q", city);
    urlForecast.searchParams.set("units", "metric");
    urlForecast.searchParams.set("appid", api.key);

    fetch(urlForecast)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                forecastCard.innerHTML = "";
            }
        })
        .then(responseForecast => {
            console.log(responseForecast);
            if (responseForecast) {

                // Dibuja los íconos del tiempo
                const iconsArray = responseForecast.list.filter((record,index)=>index%8===0).map(record=>{
                    return({
                      icon:record.weather[0].icon,
                      dt: moment.unix(record.dt).format("dddd, DD")
                    })
                  });

                for (let i=0;i<5;i++){
                    document.getElementById('fore'+i.toString()).src=`http://openweathermap.org/img/wn/${iconsArray[i].icon}@2x.png`
                    document.getElementById('day'+i.toString()).innerHTML=iconsArray[i].dt
                }

                //Grafica pronóstico
                var trace = { 
                    x: responseForecast.list.filter((record,index)=>{
                      if (index%8===0 )
                        return record
                    }).map(record=>record.dt_txt.substring(0,10)),        
                    y: responseForecast.list.filter((record,index)=>{
                      if (index%8===0 )
                        return record
                    }).map(record=>record.main.temp),      
                    text: responseForecast.list.filter((record,index)=>{
                      if (index%8===0 )
                        return record
                    }).map(record=>record.main.temp),
                    textposition: 'auto',
                    cliponaxis: false,
                    type: 'line',   
                    marker: {
                      color: '#5b9aa0'
                    }, 
                    name:'Temperatura'
                  };

                  console.log(trace);
                
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
                
                  Plotly.newPlot('plotly', [trace], layout, config);

            }
        })
        .catch(err => console.log(err));

}
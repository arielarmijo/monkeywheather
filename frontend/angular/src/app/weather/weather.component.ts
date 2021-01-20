import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CityService } from '../city.service';
import { OpenweatherService, Location } from '../openweather.service';
import * as Moment from 'moment';
import Plotly from 'plotly.js-dist';

var Plotly = require('plotly.js-dist');

@Component({
  selector: 'mc-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {

  city: string = "";
  date: string = "";
  icon: string = "";
  description: string = "";
  humidity: number = 0;
  pressure: number = 0;
  temp: number = 0;
  temp_max = 0;
  temp_min = 0;
  uvi: number = 0;

  citySubscription: Subscription;

  constructor(private weatherService: OpenweatherService, private cityService: CityService) {
    this.citySubscription = cityService.citySearched$.subscribe(city => this.getWeatherData(city));
  }

  ngOnInit(): void {
    Moment.locale("es");
  }

  ngOnDestroy() {
    this.citySubscription.unsubscribe();
  }

  getWeatherData(city: string): void {
    this.weatherService.getCityLocation(city).subscribe(data => {
      console.log(data);
      let loc: Location = data[0];
      this.city = loc.name;
      this.weatherService.getCityWeatherData(loc).subscribe(data => {
        console.log(data);
        // Datos del tiempo
        this.date = Moment.unix(data.current.dt).format("LLL");
        this.icon = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
        this.description = data.current.weather[0].description;
        this.temp = data.current.temp;
        this.humidity = data.current.humidity / 100;
        this.pressure = data.current.pressure;
        this.uvi = data.current.uvi;

        // Pronóstico
        let temperatures = data.daily.map(item => item.temp);
        let dates = data.daily.filter((item, i) => i < 5).map(item => Moment.unix(item.dt).format("dddd"));
        console.log(temperatures);
        console.log(dates);

        var tempMax = {
          x: dates,
          y: temperatures.map(data => data.max),
          text: dates,
          textposition: 'auto',
          cliponaxis: false,
          type: 'line',
          // marker: {
          //   color: '#5b9aa0'
          // },
          name: 'Temperatura máxima'
        };
        // console.log(tempMax);

        var tempMin = {
          x: dates,
          y: temperatures.map(data => data.min),
          text: dates,
          textposition: 'auto',
          cliponaxis: false,
          type: 'line',
          // marker: {
          //   color: '#622569'
          // },
          name: 'Temperatura mínima'
        };
        //console.log(tempMin);

        var tempMorn = {
          x: dates,
          y: temperatures.map(data => data.morn),
          text: dates,
          textposition: 'auto',
          cliponaxis: false,
          type: 'line',
          // marker: {
          //   color: '#5b9aa0'
          // },
          name: 'Temperatura mañana'
        };

        var tempDay = {
          x: dates,
          y: temperatures.map(data => data.day),
          text: dates,
          textposition: 'auto',
          cliponaxis: false,
          type: 'line',
          // marker: {
          //   color: '#5b9aa0'
          // },
          name: 'Temperatura día'
        };

        var tempEve = {
          x: dates,
          y: temperatures.map(data => data.eve),
          text: dates,
          textposition: 'auto',
          cliponaxis: false,
          type: 'line',
          // marker: {
          //   color: '#5b9aa0'
          // },
          name: 'Temperatura tarde'
        };

        var tempNight = {
          x: dates,
          y: temperatures.map(data => data.night),
          text: dates,
          textposition: 'auto',
          cliponaxis: false,
          type: 'line',
          // marker: {
          //   color: '#5b9aa0'
          // },
          name: 'Temperatura noche'
        };

        var layout = {
          hovermode: false,
          autoexpand: false,
          showlegend: true,
          legend: { orientation: "h"}
        }

        var config = {
          displayModeBar: false,
          responsive: true
        }

        Plotly.newPlot('forecastChart', [tempMax, tempMin, tempMorn, tempDay, tempEve, tempNight], layout, config);

      });
    });
  }

}
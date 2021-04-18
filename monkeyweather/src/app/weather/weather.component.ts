import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CityService } from '../city.service';
import { OpenweatherService, Location } from '../openweather.service';
import * as Moment from 'moment';

declare var Plotly: any;

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
    let locationData$ = this.weatherService.getCityLocation(city).subscribe(data => {
      console.log(data);
      let loc: Location = data[0];
      this.city = loc.name;
      locationData$.unsubscribe();
      let weatherData$ = this.weatherService.getCityWeatherData(loc).subscribe(data => {
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
        weatherData$.unsubscribe();
        //console.log(temperatures);
        //console.log(dates);

        var tempMax = {
          x: dates,
          y: temperatures.map(data => data.max),
          text: dates,
          hovertemplate: '%{y:.1f} °C',
          cliponaxis: false,
          type: 'line',
          name: 'Máxima'
        };

        var tempMin = {
          x: dates,
          y: temperatures.map(data => data.min),
          text: dates,
          hovertemplate: '%{y:.1f} °C',
          cliponaxis: false,
          type: 'line',
          name: 'Mínima'
        };

        var tempDay = {
          x: dates,
          y: temperatures.map(data => data.day),
          text: dates,
          hovertemplate: '%{y:.1f} °C',
          cliponaxis: false,
          type: 'line',
          name: 'Media'
        };

        var layout = {
          title: {
            text: "Temperaturas próximos 5 días",
            font: {
              size: 24
            }
          },
          xaxis: {
            title: {text: "Día"},
            showline: true,
            ticks: "outside",
          },
          yaxis: {
            title: {text: "Temperatura"},
            showline: true,
            ticks: "outside",
            ticksuffix: "°C ",
          },
          showlegend: true,
          legend: {
            itemclick: "toggleothers",
            itemdoubleclick: "toggle",
            orientation: "v",
            x: 1,
            y: 0.5,
          },
          hovermode: true,
          autoexpand: false,
          autosize: true,
        }

        var config = {
          displayModeBar: false,
          responsive: true,
          scrollZoom: true,
          doubleClickDelay: 500
        }

        Plotly.newPlot('forecastChart', [tempMax, tempDay, tempMin], layout, config);

      });
    });
  }

}
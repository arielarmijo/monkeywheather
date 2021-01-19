import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OpenweatherService } from '../openweather.service';

@Component({
  selector: 'mc-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  ciudad: string = "Santiago";
  fecha: any = "fecha";
  icon: string = "icon.png";
  description: string = "despejado";
  temp: number = 30.255;
  temp_max = 40.255;
  temp_min = 10.255;
  service: OpenweatherService;

  constructor(service: OpenweatherService) {
    this.service = service;
   }

  ngOnInit(): void {
  }

  click(): void {
    this.service.test("Santiago").subscribe(data => console.log(data));
  }

}
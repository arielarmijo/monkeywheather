import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export interface WeatherData {
  current: any;
  daily: Array<any>;
}

export interface Location {
  country: string;
  name: string;
  lat: number;
  lon: number;
}

@Injectable({
  providedIn: 'root'
})
export class OpenweatherService {

  weatherAPI: string = "http://api.openweathermap.org/data/2.5";
  geocodingAPI: string = "http://api.openweathermap.org/geo/1.0";
  key: string = "e44742fc4184a7c8f17eee0835b68795";

  constructor(private http: HttpClient) { }

  getCityLocation(city: string): Observable<Array<Location>> {
    return this.http.get<Array<Location>>(`${this.geocodingAPI}/direct?q=${city}&appid=${this.key}`);
  }

  getCityWeatherData(loc: Location): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${this.weatherAPI}/onecall?lat=${loc.lat}&lon=${loc.lon}&units=metric&lang=sp&appid=${this.key}`);
  }

}

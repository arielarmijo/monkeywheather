import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OpenweatherService {
  api: string = "http://api.openweathermap.org/data/2.5";
  key: string = "72216e8ac7dc0f927f7aa3d9b2af7c3f";

  constructor(private http: HttpClient) { }

  test(city: string): Observable<Object> {
    return this.http.get(`${this.api}/weather?q=${city}&units=metric&lang=sp&appid=${this.key}`);
  }
}

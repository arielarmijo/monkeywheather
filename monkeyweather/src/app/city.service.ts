import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  // Observable string sources
  private citySource = new Subject<string>();
  
  // Observable string sources
  citySearched$ = this.citySource.asObservable();

  // Service message commands
  putCityToSearch(city: string) {
    this.citySource.next(city);
  }

}

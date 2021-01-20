import { Component, OnInit } from '@angular/core';
import { CityService } from '../city.service';

@Component({
  selector: 'mc-citysearch',
  templateUrl: './citysearch.component.html',
  styleUrls: ['./citysearch.component.css']
})
export class CitysearchComponent implements OnInit {

  showButtons: boolean = false;
  city: string = "";

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.cityService.putCityToSearch("Santiago");
  }

  searchCity() {
    console.log(this.city);
    this.cityService.putCityToSearch(this.city);
  }

  onInputKeyUp(event: any) {
      if (event.key === "Enter") {
        this.searchCity();
      } else {
        this.city = event.target.value;
      }
  }

}


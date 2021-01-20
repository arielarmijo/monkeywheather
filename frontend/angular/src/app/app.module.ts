import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { CitysearchComponent } from './citysearch/citysearch.component';
import { WeatherComponent } from './weather/weather.component';
import { PlotlyComponent } from './plotly/plotly.component';

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, MainComponent, CitysearchComponent, WeatherComponent, PlotlyComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

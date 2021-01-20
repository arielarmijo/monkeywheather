import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'mc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(title: Title) {
    title.setTitle("Monkey Weather");
  }
}
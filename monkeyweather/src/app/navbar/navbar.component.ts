import { Component } from '@angular/core';

@Component({
  selector: 'mc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    firstLink: string = "Login";
    secondLink: string = "Sign in";
}
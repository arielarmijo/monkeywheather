import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  userName: string = "";
  password: string = "";
  error: boolean = false;
  message: string = "Usuario y/o contraseña inválido/s";

  constructor() { }

  ngOnInit(): void {
  }

  logIn(): void {
    console.log("log: ",this.userName, this.password);
  }

  onUserNameKeyUp(event: any): void {
    console.log(event);
    if (event.key === "Enter") {
      event.srcElement.parentElement.nextSibling.lastChild.focus();
    } else {
      this.userName = event.target.value;
    }
  }

  onPasswordKeyUp(event: any): void {
    console.log(event);
    if (event.key === "Enter") {
      event.srcElement.parentElement.nextSibling.firstChild.focus();
    } else {
      this.password = event.target.value;
    }
  }

}

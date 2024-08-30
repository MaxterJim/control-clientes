import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertMessagesService } from 'jjwins-angular-alert-messages';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  email: string;
  password: string;

  constructor(
    private router: Router,
    private alertMessageService: AlertMessagesService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => { //Esta parte del codigo permite mostrar la pagina de inicio si ya estas loggueado,
      if(auth){                                      // evitanto asi la pagina de login aun despues de estar loggueado
        this.router.navigate(['/']);
      }
    })
  }

  login(){
    this.loginService.login(this.email, this.password)
      .then( () => {
        this.router.navigate(['/']);
      })
      .catch(error =>{
        this.alertMessageService.show(error.message, 
          {cssClass: 'alerts-error', timeout: 1000}
        );
      });
  }

}

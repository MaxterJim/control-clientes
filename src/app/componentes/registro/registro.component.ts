import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertMessagesService } from 'jjwins-angular-alert-messages';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{

  email: string;
  password: string;

  constructor(
    private router: Router,
    private alertMessageService: AlertMessagesService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    })
  }

  registro(){
    this.loginService.registrarse(this.email, this.password)
      .then( () => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.alertMessageService.show(error.message, 
          { cssClass: 'alerts-error', timeOut: 4000 }
        );
      });
  }


}

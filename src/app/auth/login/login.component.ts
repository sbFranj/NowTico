import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interfaces/loginRequest';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private authService:AuthService,
              private router:Router
  ){}

  loginRequest:LoginRequest={
    username:"",
    password:""
  }

  login(){
    this.authService.login(this.loginRequest)
    .subscribe({
      next:resp=>{
        Swal.fire({
          title: "Correcto",
          text: "Bienvenido",
          icon: "success"
        });
        this.router.navigateByUrl("/")
      },
      error:err=>{
        Swal.fire({
          title: "Error",
          text: err.error.message,
          icon: "warning"
        });
      }
    })
  }

}

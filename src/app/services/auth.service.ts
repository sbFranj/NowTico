import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/loginRequest';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,
              private router:Router
  ) { }
  baseUrl:string = "http://localhost:9090"

  

  toLocalStorage(resp : any){
    localStorage.setItem("token", resp.token);
  }

  isLogged():boolean{
    return localStorage.getItem("token") ? true:false
  }

  getToken():string | null{
    return localStorage.getItem("token")?.length ? localStorage.getItem("token"):""
  }

  getUserData(){
      let token:string = localStorage.getItem("token") as any;
      const {name, role, sub, id} = jwtDecode(token) as any
      return {
        nombre:name,
        role:role,
        id:id,
        dni:sub
      }
  }

  login(login:LoginRequest):Observable<any>{
    return this.http.post(`${this.baseUrl}/loginuser`,login)
    .pipe(
      tap(resp=>{
        this.toLocalStorage(resp)
        
      }),
      map(resp=>true),
      catchError(err => of(err.error.msg))
    )
  }

  logout(){
    localStorage.removeItem("token")
    Swal.fire({
      title: "Cesion cerrada",
      icon: "success",
      showConfirmButton:true,
      confirmButtonText: "Volver",
      showDenyButton:true,
      denyButtonText:"Ir al login"
    }).then(resp=>{
      if(resp.isConfirmed){
        this.router.navigateByUrl("/")
      }
    });
  }
  
}

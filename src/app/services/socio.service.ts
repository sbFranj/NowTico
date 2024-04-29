import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socio } from '../interfaces/socio';

@Injectable({
  providedIn: 'root'
})
export class SocioService {

  constructor(private http:HttpClient) { }
  baseUrl:string = "http://localhost:9090/socios"

  getSocios():Observable<Socio[]>{
    return this.http.get<Socio[]>(this.baseUrl)
  }

  getSocio(idSocio:string):Observable<Socio>{
    return this.http.get<Socio>(`${this.baseUrl}/${idSocio}`)
  }

  postSocio(socio:Socio):Observable<Socio>{
    return this.http.post<Socio>(`${this.baseUrl}/add_socio`,socio)
  }

  putSocio(socio:Socio, idSocio:string){
    return this.http.put(`${this.baseUrl}/edit_socio/${idSocio}`,socio)
  }

  delSocio(idSocio:string){
    return this.http.delete(`${this.baseUrl}/del_socio/${idSocio}`)
  }
}

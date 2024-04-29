import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Barco } from '../interfaces/barco';
import { Socio } from '../interfaces/socio';

@Injectable({
  providedIn: 'root'
})
export class BarcoService {

  constructor(private http:HttpClient) { }
  baseUrl:string = "http://localhost:9090/barcos"

  getBarcos():Observable<Barco[]>{
    return this.http.get<Barco[]>(`${this.baseUrl}`)
  }

  getBarco(idBarco:string):Observable<Barco>{
    return this.http.get<Barco>(`${this.baseUrl}/${idBarco}`)
  }

  search(busqueda:string):Observable<Barco[]>{
    return this.http.get<Barco[]>(`${this.baseUrl}/busqueda?nombre=${busqueda}`)
  }

  getPropietario(idSocio:number):Observable<Socio>{
    return this.http.get<Socio>(`${this.baseUrl}/propietario/${idSocio}`)
  }

  postBarco(barco:Barco, idSocio:string):Observable<Barco>{
    return this.http.post<Barco>(`${this.baseUrl}/add_barco/${idSocio}`, barco)
  }

  delBarco(idBarco:string){
    return this.http.delete(`${this.baseUrl}/del_barco/${idBarco}`)
  }

  putBarco(barco:Barco, idBarco:string){
    return this.http.put(`${this.baseUrl}/edit_barco/${idBarco}`, barco)
  }
}

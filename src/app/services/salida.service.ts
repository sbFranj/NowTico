import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salida } from '../interfaces/salida';

@Injectable({
  providedIn: 'root'
})
export class SalidaService {

  constructor(private http:HttpClient) { }
  baseUrl:string = "http://localhost:9090/salidas"

  getSalidas():Observable<Salida[]>{
    return this.http.get<Salida[]>(this.baseUrl)
  }

  getSalida(idSalida:string):Observable<Salida>{
    return this.http.get<Salida>(`${this.baseUrl}/${idSalida}`)
  }

  postSalida(salida:Salida, idBarco:string):Observable<Salida>{
    return this.http.post<Salida>(`${this.baseUrl}/add_salida/${idBarco}`, salida)
  }

  putSalida(salida:Salida, idSalida:string, idBarco:string){
    return this.http.put(`${this.baseUrl}/edit_salida/${idSalida}/${idBarco}`, salida)
  }

  delSalida(idSalida:string){
    return this.http.delete(`${this.baseUrl}/del_salida/${idSalida}`)
  }
}

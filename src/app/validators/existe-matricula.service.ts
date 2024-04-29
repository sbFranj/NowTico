import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExisteMatriculaService implements AsyncValidator{

  constructor(private http:HttpClient) { }

  validate(control: AbstractControl):Observable<ValidationErrors |null>{
    const matricula = control.value;

    return this.http.get<any[]>(`http://localhost:9090/barcos/matricula/${matricula}`)
    .pipe(
      map( resp => {
        return (resp.length===0? null : {matriculaTaken:true})
      })
    )
  }
}

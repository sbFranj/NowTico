import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExisteAmarreService implements AsyncValidator{

  constructor(private http:HttpClient) { }

  validate(control: AbstractControl):Observable<ValidationErrors |null>{
    const amarre = control.value;

    return this.http.get<any[]>(`http://localhost:9090/barcos/amarre/${amarre}`)
    .pipe(
      map( resp => {
        return (resp.length===0? null : {amarreTaken:true})
      })
    )
  }
}

import { getLocaleDateFormat } from '@angular/common';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  fechaPresenteOFutura(control:AbstractControl){
    const fecha = new Date(control.value);
    const hoy = new Date();
    return fecha<hoy ? {fechaPasada:true} : null
  }
}

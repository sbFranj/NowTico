import { Component, Input, OnInit } from '@angular/core';
import { BarcoService } from '../../services/barco.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocioService } from '../../services/socio.service';
import { Socio } from '../../interfaces/socio';
import Swal from 'sweetalert2';
import { ExisteMatriculaService } from '../../validators/existe-matricula.service';
import { ExisteAmarreService } from '../../validators/existe-amarre.service';
import { Barco } from '../../interfaces/barco';
import {Pipe} from '@angular/core'
import { Router } from '@angular/router';


@Component({
  selector: 'app-barco',
  templateUrl: './barco.component.html'
})
export class BarcoComponent implements OnInit{

  constructor(private barcoService:BarcoService,
              private socioService:SocioService, 
              private fb:FormBuilder,
              private router:Router,
              private matriculaTaken:ExisteMatriculaService,
              private amarreTaken:ExisteAmarreService
  ){}

  socios:Socio[] = []

  @Input() id:string = ""

  myForm:FormGroup = this.fb.group({
    numero_matricula:["", [Validators.required, Validators.pattern(/\S/)], [this.matriculaTaken]],
    nombre:["", [Validators.required, Validators.pattern(/\S/)]],
    numero_amarre:["", [Validators.required, Validators.min(0)],[this.amarreTaken]],
    cuota:["", [Validators.required, Validators.min(0)]],
    propietario:["", [Validators.required]]
  })

  barco!:Barco

  noValido(campo:string):boolean{
    return this.myForm?.controls[campo]?.invalid && this.myForm?.controls[campo]?.touched
  }

  get matriculaError():string{
    const errors = this.myForm.get('numero_matricula')?.errors
    let msg:string = ""
    if(errors){
      if(errors['required']){
        msg = "Matricula necesaria"
      }else if(errors['pattern']){
        msg = "Matricula necesaria"
      }else if(this.id && this.id==this.barco.id_barco.toString() 
        && this.myForm.controls['numero_matricula'].value == this.barco.numero_matricula){
        this.myForm.get('numero_matricula')?.setErrors(null)
      }else if(errors['matriculaTaken']){
        msg = "Esa matricula ya existe"
      }
    }
    return msg;
  }
 

  get numero_amarreError():string{
    const errors = this.myForm.get('numero_amarre')?.errors
    let msg:string = ""
    if(errors){
      if(errors['required']){
        msg = "Numero de amarre necesario"
      }else if(errors['min'] ){
        msg = "El numero de amarre no puede ser menor que 0"
      }else if(this.id && this.id==this.barco.id_barco.toString() 
        && this.myForm.controls['numero_amarre'].value == this.barco.numero_amarre){
        this.myForm.get('numero_amarre')?.setErrors(null)
      }else if(errors['amarreTaken']){
        msg = "El numero de amarre ya está asignado"
      }
    }
    return msg;
  }

  get cuotaError():string{
    const errors = this.myForm.get('cuota')?.errors
    let msg:string = ""
    if(errors){
      if(errors['required']){
        msg = "Cuota necesaria"
      }if(errors['min'] ){
        msg = "La cuota no puede ser menor que 0"
      }
    }
    return msg;
  }

  ngOnInit(): void {
    if(this.id){
      
      this.barcoService.getBarco(this.id)
      .subscribe({
        next:barco=>{
          this.barco = barco
          this.barcoService.getPropietario(barco.id_barco)
          .subscribe({
            next:propietario=>{
              barco.propietario=propietario
              this.myForm.reset(barco)
              this.myForm.controls['propietario'].setValue(propietario.id_socio)
              this.myForm.markAllAsTouched()
            }
          })
        }
      })
    }
    this.socioService.getSocios()
    .subscribe({
      next:socios=>{
        this.socios = socios
      }
    })
  }

  submit(){
    this.myForm.markAllAsTouched()
    if(this.myForm.valid){
      const {propietario, ...barco} = this.myForm.value;
      
      if(!this.id){

        this.barcoService.postBarco(barco, propietario)
        .subscribe({
          next:resp=>{
            Swal.fire({
              title: barco.nombre,
              text: "Añadido correctamente",
              icon: "success"
            });
            this.router.navigateByUrl(`/barco/${resp.id_barco}`)
          },
          error:err=>{
            console.log(err)
            Swal.fire({
              title: "Error",
              text: err.message,
              icon: "error"
            });
          }
        })
      }else{
        let barcoEdit:Barco = barco;
        this.socioService.getSocio(propietario)
        .subscribe({
          next:socio=>{
            barcoEdit.propietario=socio;
            this.barcoService.putBarco(barcoEdit, this.id)
            .subscribe({
              next:resp=>{
                Swal.fire({
                  title: barco.nombre,
                  text: "Editado correctamente",
                  icon: "success"
                });
              },
              error:err=>{
                console.log(err)
                Swal.fire({
                  title: "Error",
                  text: err.message,
                  icon: "error"
                });
              }
            })
          }
        })

      }
    }
  }
}

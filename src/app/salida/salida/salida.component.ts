import { Component, Input, OnInit } from '@angular/core';
import { SalidaService } from '../../services/salida.service';
import { BarcoService } from '../../services/barco.service';
import { Barco } from '../../interfaces/barco';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ValidatorService } from '../../validators/validator.service';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html'
})
export class SalidaComponent implements OnInit {

  constructor(private salidaService: SalidaService,
              private barcoService: BarcoService,
              private fb: FormBuilder,
              private router: Router,
              private validator: ValidatorService
  ) { }

  barcos: Barco[] = []

  @Input() id:number = -1

  fechaEdit!:Date 

  myForm:FormGroup = this.fb.group({
    barco:["",[Validators.required]],
    fecha:["",[Validators.required, this.validator.fechaPresenteOFutura]],
    destino:["",[Validators.required, Validators.pattern(/\S/)]],
    dni:["",[Validators.required, Validators.pattern(/[0-9]{8}[A-Z]/)]]
  })

  noValido(campo: string): boolean {
    return this.myForm?.controls[campo]?.invalid && this.myForm?.controls[campo]?.touched
  }

  get dniError(): string {
    const errors = this.myForm.get('dni')?.errors
    let msg: string = ""
    if (errors) {
      if (errors['pattern']) {
        msg = "Necesita tener formato de dni: 8 numero y una letra mayuscula"
      } else if (errors['required']) {
        msg = "Necesita tener formato de dni: 8 numero y una letra mayuscula"
      }
    }
    return msg;
  }

  get fechaError(): string {
    const errors = this.myForm.get('fecha')?.errors
    let msg: string = ""
    if (errors) {
      if (errors['fechaPasada']) { 
        msg = "La fecha tiene que ser posterior a ahora( "+new Date()+" )"
      }else if (errors['required']) {
        msg = "Fecha necesaria"
      }
      console.log("1",this.myForm.controls['fecha'].value)
      console.log("2", this.fechaEdit)
    }
    return msg;
  }

  ngOnInit(): void {
    this.barcoService.getBarcos()
    .subscribe({
      next:barcos=>{
        this.barcos = barcos
      }
    })
    if(this.id>=0){
      this.salidaService.getSalida(this.id.toString())
      .subscribe({
        next:salida=>{
          this.myForm = this.fb.group({
            barco:["",[Validators.required]],
            fecha:[""],
            destino:["",[Validators.required, Validators.pattern(/\S/)]],
            dni:["",[Validators.required, Validators.pattern(/[0-9]{8}[A-Z]/)]]
          })
          const {barco, fecha, destino, dni} = salida
          this.fechaEdit=fecha
          let fechaFormat = this.formatearFecha(fecha)
          this.myForm.reset({barco:barco.id_barco, destino:destino, dni:dni, fecha:fechaFormat})  
        },
        error:err=>{
          Swal.fire({
            title: "Error al crear la salida",
            text:err.error.message,
            icon: "error"
          });
        }
      })
    }

  }

  submit(){
    this.myForm.markAllAsTouched()
    if(this.myForm.valid){
      const { barco, ...salida } = this.myForm.value
      if(this.id){
        this.salidaService.putSalida(salida, this.id.toString(), barco)
        .subscribe({
          next:resp=>{
            Swal.fire({
              title: "Salida editada correctamente",
              icon: "success"
            });
            this.router.navigateByUrl("/salida/"+this.id)
          },
          error:err=>{
            Swal.fire({
              title: "Error al editar la salida",
              text: err.message,
              icon: "error"
            });
          }
        })
      }else{
        this.salidaService.postSalida(salida, barco)
        .subscribe({
          next:salida=>{
            Swal.fire({
              title: "Salida creada correctamente",
              icon: "success"
            });
            this.router.navigateByUrl("/salida/"+salida.id)
          },
          error:err=>{
            Swal.fire({
              title: "Error al crear la salida",
              text:err.error.message,
              icon: "error"
            });
          }          
        })
      }
    }

  }

  formatearFecha(milisegundos: Date): string {
    const fecha = new Date(milisegundos);
    const anio = fecha.getFullYear();
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const dia = ('0' + fecha.getDate()).slice(-2);
    const horas = ('0' + fecha.getHours()).slice(-2);
    const minutos = ('0' + fecha.getMinutes()).slice(-2);
    return `${anio}-${mes}-${dia}T${horas}:${minutos}`;
}


}

import { Component, Input, OnInit } from '@angular/core';
import { SocioService } from '../../services/socio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExisteDniService } from '../../validators/existe-dni.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-socio',
  templateUrl: './socio.component.html'
})
export class SocioComponent implements OnInit {

  constructor(private socioService: SocioService,
    private fb: FormBuilder,
    private router: Router,
    private existeDni: ExisteDniService
  ) { }

  myForm: FormGroup = this.fb.group({
    nombre: ["", [Validators.required, Validators.pattern(/\S/)]],
    apellido: ["", [Validators.required, Validators.pattern(/\S/)]],
    dni: ["", [Validators.required, Validators.pattern(/[0-9]{8}[A-Z]/)], [this.existeDni]]
  })

  @Input() id: number = -1

  @Input() register:string = ""

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
      } else if (errors['dniTaken']) {
        msg = "Ese dni ya existe"
      }
    }
    return msg;
  }

  ngOnInit(): void {
    
    if (this.id >= 0) {
      this.myForm = this.fb.group({
        nombre: ["", [Validators.required, Validators.pattern(/\S/)]],
        apellido: ["", [Validators.required, Validators.pattern(/\S/)]],
        dni: [""]
      })
      this.socioService.getSocio(this.id.toString())
        .subscribe({
          next: socio => {
            this.myForm.reset(socio)
          }
        })
    }

  }

  submit() {
    this.myForm.markAllAsTouched()
    if (this.myForm.valid) {
      if (this.id >= 0) {
        this.socioService.putSocio(this.myForm.value, this.id.toString())
          .subscribe({
            next: resp => {
              Swal.fire({
                title: "Editado Correctamente",
                icon: "success"
              });
              if(!this.register){

                this.router.navigateByUrl("/socio/" + this.id)
              }else{
                this.router.navigateByUrl("/")
              }
            // },
            // error: err => {
            //   Swal.fire({
            //     title: "Error",
            //     text: err.error.message,
            //     icon: "error"
            //   });
            }
          })
      } else {
        this.socioService.postSocio(this.myForm.value)
          .subscribe({
            next: resp => {
              Swal.fire({
                title: resp.nombre + " " + resp.apellido,
                text: "Añadido correctamente",
                icon: "success"
              });
              this.router.navigateByUrl("/socio/" + resp.id_socio)
            },
            // error: err => {
            //   Swal.fire({
            //     title: "Error",
            //     text: err.message,
            //     icon: "error"
            //   });
            // }
          })
      }
    }
  }

}

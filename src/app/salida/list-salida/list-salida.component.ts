import { Component, Input, OnInit } from '@angular/core';
import { SalidaService } from '../../services/salida.service';
import { Salida } from '../../interfaces/salida';
import Swal from 'sweetalert2';
import { SocioService } from '../../services/socio.service';
import { BarcoService } from '../../services/barco.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-salida',
  templateUrl: './list-salida.component.html'
})
export class ListSalidaComponent implements OnInit{

  constructor(private salidaService:SalidaService,
              private socioService:SocioService,
              private barcoService:BarcoService,
              public authService:AuthService
  ){}

  salidas:Salida[] = []
  dniSocios:string[] = []
  nombreBarco:string =""

  @Input() idBarco:number = -1

  del(index:number){
    let salida = this.salidas[index]
    Swal.fire({
      title: `Estas seguro de eliminar la salida del ${salida.fecha}h y destino ${salida.destino}`,
      icon: "warning",
      showConfirmButton:true,
      confirmButtonColor:"#F95248",
      confirmButtonText: "Eliminar",
      showCancelButton:true,
      iconColor:"#F95248"
    }).then(resp=>{
      if(resp.isConfirmed){
        this.salidaService.delSalida(salida.id.toString())
        .subscribe({
          next:resp=>{
            Swal.fire({
              title: "Eliminado correctamente",
              icon: "success"
            });
            this.salidaService.getSalidas()
            .subscribe({
              next:(salidas=>{
                this.salidas = salidas
              }),
              error:err=>{
                Swal.fire({
                  title: "Error al listar",
                  text: err.error.message,
                  icon: "warning"
                });
              }
            })
          },
          error:err=>{
            Swal.fire({
              title: "Error al eliminar",
              text:err.message,
              icon: "error"
            });
          }
        })
      }
    })
  }

  ngOnInit(): void {
    this.socioService.getSocios()
    .subscribe({
      next:socios=>{
        socios.forEach(socio => {
          this.dniSocios.push(socio.dni)
        });
      }
    })
    if(this.idBarco>=0){
      this.barcoService.getBarco(this.idBarco.toString())
      .subscribe({
        next:barco=>{
          this.nombreBarco=barco.nombre
          this.salidas=barco.salidas
          console.log(barco.salidas)
        },
        error:err=>{
          Swal.fire({
            title: "Error al listar",
            text: err.error.message,
            icon: "warning"
          });
        }
      })
    }else{

      this.salidaService.getSalidas()
      .subscribe({
        next:salidas=>{
          this.salidas=salidas
          
        },
        error:err=>{
          Swal.fire({
            title: "Error al listar",
            text: err.error.message,
            icon: "warning"
          });
        }
      })
    }
  }
  formatearFecha(milisegundos: Date): string {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    const fecha = new Date(milisegundos);
    const anio = fecha.getFullYear();
    const mes = meses[fecha.getMonth()];
    const dia = fecha.getDate();
    const horas = ('0' + fecha.getHours()).slice(-2);
    const minutos = ('0' + fecha.getMinutes()).slice(-2);
    return `${dia} ${mes} ${anio}, ${horas}:${minutos}`;

}

}

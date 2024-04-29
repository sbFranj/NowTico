import { Component, OnInit } from '@angular/core';
import { BarcoService } from '../../services/barco.service';
import { Barco } from '../../interfaces/barco';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit{

  constructor(private barcoService:BarcoService,
              private router:Router,
              public authService:AuthService
  ){}

  barcos:Barco[] = []

  receiveSearch($event:string){
   
    this.barcoService.search($event)
    .subscribe({
      next:barcos=>{
        this.barcos = barcos
      },
      error:err=>{
        console.log(err.error.message)
      }
    })
  }
  
  ngOnInit(): void {
    this.barcoService.getBarcos()
    .subscribe({
      next:(barcos=>{
        this.barcos = barcos
        
      }),
      error:err=>{
        Swal.fire({
          title: "Error al listar",
          text: err.error.message,
          icon: "warning"
        });
      }
    })
  }

  delBarco(index:number){
    let barco = this.barcos[index]
    let id:string = barco.id_barco.toString()
    Swal.fire({
      title: `Eliminar a ${barco.nombre} ?`,
      icon: "warning",
      showConfirmButton:true,
      confirmButtonColor:"#F95248",
      confirmButtonText: "Eliminar",
      showCancelButton:true,
      iconColor:"#F95248"
    }).then(resp=>{
      if(resp.isConfirmed){
        this.barcoService.delBarco(id)
        .subscribe({
          next:resp=>{
            Swal.fire({
              title: "Eliminado correctamente",
              icon: "success"
            });
            this.barcoService.getBarcos()
            .subscribe({
              next:(barcos=>{
                this.barcos = barcos
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
    });

  }

  getPropietario(idPropietario:number, index:number){
    this.barcoService.getPropietario(idPropietario)
    .subscribe({
      next:propietario=>{
        this.barcos[index].propietario=propietario
        let barco = this.barcos[index]
        if (this.authService.getUserData().role=="admin") {
          Swal.fire({
            title: `${barco.nombre}`,
            text: "Informacion:",
            html:`
            Matricula:
            <p><b>${barco.numero_matricula}</b></p>
            Cuota:
            <p><b>${barco.cuota} €</b></p>
            Numero de amarre:
            <p><b>${barco.numero_amarre}</b></p>
            `,
            showConfirmButton:true,
            confirmButtonColor:"#aaaaaa",
            confirmButtonText:"Propietario",
            showDenyButton:true,
            denyButtonColor:"#aaaaaa",
            denyButtonText:"Salidas"
          }).then(resp=>{
            if(resp.isConfirmed){
              this.router.navigateByUrl("/socio/"+barco.propietario?.id_socio)
            }else if(resp.isDenied){
              this.router.navigateByUrl("/salidas/"+barco.id_barco)
            }
          });
        }else{
          Swal.fire({
            title: `${barco.nombre}`,
            text: "Informacion:",
            html:`
            Matricula:
            <p><b>${barco.numero_matricula}</b></p>
            Cuota:
            <p><b>${barco.cuota} €</b></p>
            Numero de amarre:
            <p><b>${barco.numero_amarre}</b></p>
            `,
            showConfirmButton:false
          })
        }
      }
    })
  }

}

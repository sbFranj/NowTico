import { Component, OnInit } from '@angular/core';
import { SocioService } from '../../services/socio.service';
import { Socio } from '../../interfaces/socio';
import Swal from 'sweetalert2';
import { Barco } from '../../interfaces/barco';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-socio',
  templateUrl: './list-socio.component.html'
})
export class ListSocioComponent implements OnInit{

  constructor(private socioService:SocioService,
              public authService:AuthService
  ){}

  socios:Socio[] = []

  barcos:Barco[] = []

  show:boolean = false;

  lastIndex:number = -1

  showBarcos( index:number ){
    this.barcos=this.socios[index].barcos
    
    if(this.lastIndex==index){
      this.show=!this.show;
    }else{
      this.show=true
    }
    this.lastIndex=index
  }

  ngOnInit(): void {
    this.socioService.getSocios()
    .subscribe({
      next:socios=>{
        this.socios = socios
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

  
  del(index:number){
    let socio = this.socios[index]
    Swal.fire({
      title: `Eliminar a ${socio.nombre} ${socio.apellido} ?`,
      icon: "warning",
      showConfirmButton:true,
      confirmButtonColor:"#F95248",
      confirmButtonText: "Eliminar",
      showCancelButton:true,
      iconColor:"#F95248"
    }).then(resp=>{
      if(resp.isConfirmed){
        this.socioService.delSocio(socio.id_socio.toString())
        .subscribe({
          next:resp=>{
            Swal.fire({
              title: "Eliminado correctamente",
              icon: "success"
            });
            this.socioService.getSocios()
            .subscribe({
              next:socios=>{
                this.socios=socios
              },
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
}

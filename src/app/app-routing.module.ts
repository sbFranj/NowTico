import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './barco/list/list.component';
import { BarcoComponent } from './barco/barco/barco.component';
import { ListSocioComponent } from './socio/list-socio/list-socio.component';
import { SocioComponent } from './socio/socio/socio.component';
import { ListSalidaComponent } from './salida/list-salida/list-salida.component';
import { SalidaComponent } from './salida/salida/salida.component';
import { LoginComponent } from './auth/login/login.component';
import { loginGuard } from './guardians/login.guard';
import { adminGuard } from './guardians/admin.guard';
import { HomeComponent } from './layout/home/home.component';

export const routes: Routes = [
  {path: "", component: HomeComponent},
  { path: "barcos", component: ListComponent , canMatch:[loginGuard]},
  { path: "barco", component: BarcoComponent , canMatch:[loginGuard,adminGuard]},
  { path: "barco/:id", component: BarcoComponent , canMatch:[loginGuard,adminGuard]},
  { path: "socios", component: ListSocioComponent , canMatch:[loginGuard]},
  { path: "socio", component: SocioComponent , canMatch:[loginGuard]},
  { path: "socio/:id", component: SocioComponent , canMatch:[loginGuard,adminGuard]},
  { path: "salidas", component: ListSalidaComponent , canMatch:[loginGuard]},
  { path: "salidas/:idBarco", component: ListSalidaComponent , canMatch:[loginGuard,adminGuard]},
  { path: "salida", component: SalidaComponent , canMatch:[loginGuard,adminGuard]},
  { path: "salida/:id", component: SalidaComponent , canMatch:[loginGuard,adminGuard]},
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

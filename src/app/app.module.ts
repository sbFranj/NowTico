import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './layout/menu/menu.component';
import {  RouterLink, RouterOutlet, provideRouter, withComponentInputBinding } from '@angular/router';
import { ListComponent } from './barco/list/list.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BarcoComponent } from './barco/barco/barco.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListSocioComponent } from './socio/list-socio/list-socio.component';
import { SocioComponent } from './socio/socio/socio.component';
import { ListSalidaComponent } from './salida/list-salida/list-salida.component';
import { SalidaComponent } from './salida/salida/salida.component';
import { LoginComponent } from './auth/login/login.component';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { HomeComponent } from './layout/home/home.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SearchComponent } from './layout/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ListComponent,
    BarcoComponent,
    ListSocioComponent,
    SocioComponent,
    ListSalidaComponent,
    SalidaComponent,
    LoginComponent,
    HomeComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    NgxUiLoaderModule
    
  ],
  providers: [provideRouter(routes, withComponentInputBinding()), provideHttpClient(withInterceptors([jwtInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }

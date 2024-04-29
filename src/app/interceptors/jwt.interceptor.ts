import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const loader = inject(NgxUiLoaderService)
    if(!req.url.includes("/barcos/matricula") 
        && !req.url.includes("/barcos/amarre") 
    && !req.url.includes("/socios/dni")
    && !req.url.includes("/barcos/busqueda")){

        loader.start()
    }
    
    if(typeof localStorage != "undefined"){

    const token = localStorage.getItem('token');
    if(token){
        req = req.clone({
            setHeaders: {"Authorization": token}
        })
        console.log(req)
    }
  }
  return next(req).pipe(finalize(()=> loader.stop()));

};
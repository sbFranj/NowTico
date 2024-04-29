import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanMatchFn = (route, segments) => {
  const authservice = inject(AuthService)
  const router = inject(Router)

  return authservice.getUserData().role=="admin"? true : router.navigateByUrl("/login");
};
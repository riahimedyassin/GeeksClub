import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from 'src/app/services/auth/jwt.service';

export const adminLoginGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);
  if (jwtService.getToken()) {
    router.navigateByUrl('/admin');
    return false;
  }
  return true;
};

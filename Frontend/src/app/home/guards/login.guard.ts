import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from 'src/app/dashboard/shared/services/user/user.service';
import { JwtService } from 'src/app/services/auth/jwt.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);
  if (jwtService.getToken()) {
    router.navigateByUrl('/dashboard');
    return false;
  }
  return true;
};

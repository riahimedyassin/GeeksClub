import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from 'src/app/services/auth/jwt.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService) ; 
  const router = inject(Router)
  const token = jwtService.getToken()
  if(token ) return true ;
  else {
    router.navigateByUrl('/login/admin')
    return false 
  }
  
};

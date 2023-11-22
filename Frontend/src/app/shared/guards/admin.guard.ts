import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { JwtService } from 'src/app/services/auth/jwt.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService) ; 
  const token = jwtService.getToken()
  if(token ) return true ;
  return false 
  
};

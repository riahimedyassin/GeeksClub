import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/auth/jwt.service';

export const loginGuard: CanActivateFn = (route, state) => {
    const jwt = inject(JwtService); 
    const router = inject(Router)
    if(jwt.getToken()) {
        router.navigate(['dashboard'])
        return false 
    }
    return true 
};

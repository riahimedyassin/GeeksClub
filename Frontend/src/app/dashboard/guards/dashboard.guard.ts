import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/auth/jwt.service';
import { UserService } from '../shared/services/user/user.service';

export const dashboardGuard: CanActivateFn = (route, state) => {
    const jwt = inject(JwtService);
    const router = inject(Router);
    if(jwt.getToken()!=null) return true
    router.navigate(['/login'])
    return false ;
};



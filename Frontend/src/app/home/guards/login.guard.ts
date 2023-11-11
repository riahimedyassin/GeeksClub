import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from 'src/app/dashboard/shared/services/user/user.service';
import { JwtService } from 'src/app/services/auth/jwt.service';

export const loginGuard: CanActivateFn = (route, state) => {
    const jwt = inject(JwtService); 
    const router = inject(Router);
    const userService = inject(UserService)
    if(jwt.getToken()) {
        userService.getCurrentUser().subscribe(()=> {
            router.navigate(['dashboard'])
            return false 
        })
    }
    return true 
};

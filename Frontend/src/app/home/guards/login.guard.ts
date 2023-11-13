import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from 'src/app/dashboard/shared/services/user/user.service';

export const loginGuard: CanActivateFn = (route, state) => {
    const userService = inject(UserService)
    userService.getCurrentUser().subscribe(response=> {
        return false 
    })
    return true 
};

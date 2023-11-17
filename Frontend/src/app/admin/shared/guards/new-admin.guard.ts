import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AdminService } from '../services/admin.service';

export const newAdminGuard: CanActivateFn = (route, state) : Observable<any> => {
  const adminService = inject(AdminService)
  const router= inject(Router)
  return adminService.getCurrentAdmin().pipe(take(1),map(response=> {
    if(response.data.isSup) return true ; 
    else {
      router.navigateByUrl('/admin/admins')
      return false 
    }
  }))
};

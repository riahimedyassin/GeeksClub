import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AdminService } from '../services/admin.service';

export const isSuperAdminResolver: ResolveFn<boolean> = (
  route,
  state
): Observable<boolean> => {
  const adminService = inject(AdminService);
  return adminService.getCurrentAdmin().pipe(
    take(1),
    map((response) => {
      return response.data.isSup;
    })
  );
};

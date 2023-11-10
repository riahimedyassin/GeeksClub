import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandleError {
  constructor(private router: Router) {}
  handle(error: HttpErrorResponse) {
    if (error.status === 403 || error.status===404) {
      this.router.navigate(['login']);
    }
    return throwError(error.message);
  }
}

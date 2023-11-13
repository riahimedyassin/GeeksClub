import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { JwtService } from 'src/app/services/auth/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class HandleError {
  constructor(private router: Router , private jwtService : JwtService) {}
  handle(error: HttpErrorResponse) {
    if (error.status == 403 ) {
      console.log("Hola ?")
      this.jwtService.removeToken()
      this.router.navigate(['/login'])
      return throwError(error.message);
    }
    else {
      console.log(error)
    }
    return throwError(error.message);
  }
}

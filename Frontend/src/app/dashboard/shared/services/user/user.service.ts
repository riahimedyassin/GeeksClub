import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { User } from 'src/app/shared/models/User.model';
import { environment } from 'src/env/env';
import { JwtService } from '../../../../services/auth/jwt.service';
import { Response } from 'src/app/shared/models/Response.model';
import { HandleError } from '../../error/errorHandler';



const URL= `${environment.host}/members`

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient , private jwtService : JwtService, private errorHandler : HandleError) { }
  logout() {
    this.jwtService.removeToken()
  }
  getCurrentUser() : Observable<Response<User>> {
    return this.http.get<Response<User>>(`${URL}/me`).pipe(catchError((error: any)=> this.errorHandler.handle(error)))
  }


}

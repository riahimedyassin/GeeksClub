import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/User.model';
import { environment } from 'src/env/env';
import { JwtService } from '../auth/jwt.service';
import { Response } from 'src/app/shared/models/Response.model';



const URL= `${environment.host}/members`

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient , private jwtService : JwtService) { }
  logout() {
    this.jwtService.removeToken()
  }
  getCurrentUser() : Observable<Response<User>> {
    return this.http.get<Response<User>>(`${URL}/me`)
  }


}

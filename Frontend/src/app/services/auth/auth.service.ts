import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/User.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }
  register(user : User) {
     return this.http.post(`${environment.host}/members/register`,user)
  }


}

import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/User.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env/env';
import { Observable } from 'rxjs';
import { Response } from 'src/app/shared/models/Response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }
  register(user : User) {
     return this.http.post(`${environment.host}/members/register`,user)
  }
  imageUpload( image : File) {
    const formData : FormData = new FormData() ; 
    formData.append('picture',image,image.name);
    formData.append('id',"test")
    return this.http.post(`${environment.host}/members/image`,formData)
  }
  login(email : string , password : string ) : Observable<Response<string>> {
    return this.http.post<Response<string>>(`${environment.host}/members/login`,{email,password})
  }
  loginAdmin(email : string , password : string ) : Observable<Response<string>> {
    return this.http.post<Response<string>>(`${environment.host}/dashboard/login`,{email,password})
  }

  recoverAccount(question : string , answer : string , email : string , password: string ) {
    return this.http.post(`${environment.host}/members/recover`,{question,answer,email,password})
  }


}

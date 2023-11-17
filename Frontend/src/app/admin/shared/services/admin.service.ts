import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from 'src/app/services/auth/jwt.service';
import { Admin } from 'src/app/shared/models/Admin.model';
import { Response } from 'src/app/shared/models/Response.model';
import { User } from 'src/app/shared/models/User.model';
import { environment } from 'src/env/env';

const ADMINURL = `${environment.host}/dashboard`;
const MEMBERSURL = `${environment.host}/members`;

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient , private jwtService : JwtService) {}
  updated: boolean = false;

  admin$: Observable<Response<Admin>> = new Observable<Response<Admin>>(
    (observer) => {
      observer.next({
        message: 'Admin retrieved succussfully',
        status: 200,
        data: <Admin>this.admin,
      });
    }
  );
  admin!: Admin | null;

  private cacheAdmin() {
    console.log('cached ');
    this.updated = false;
    this.http.get<Response<Admin>>(`${ADMINURL}/me`).subscribe((response) => {
      this.admin = response.data;
    });
  }
  getCurrentAdmin(): Observable<Response<Admin>> {
    if (this.admin && !this.updated) return this.admin$;
    else {
      this.cacheAdmin();
      return this.http.get<Response<Admin>>(`${ADMINURL}/me`);
    }
  }
  getAllRegistered(): Observable<Response<User>> {
    return this.http.get<Response<User>>(`${MEMBERSURL}/registered/all`);
  }
  editAdmin(admin: Admin) {
    this.updated = true;
    return this.http.patch(`${ADMINURL}/me`, admin);
  }
  changePassword(password: string, newPassword: string) {
    return this.http.patch(`${ADMINURL}/me/password`, {
      password : password,
      newPassword : newPassword,
    });
  }
  getAllAdmins(): Observable<Response<Admin[]>> {
    return this.http.get<Response<Admin[]>>(`${ADMINURL}`);
  }
  registerAdmin(admin: Admin): Observable<Response<Admin>> {
    return this.http.post<Response<Admin>>(`${ADMINURL}/register`, admin);
  }
  deleteAdmin(id:string) {
    return this.http.delete(`${ADMINURL}/${id}`)
  }
  logout() {
    this.jwtService.removeToken()
    this.admin=null ;
  }
}

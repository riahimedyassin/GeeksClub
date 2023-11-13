import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/shared/models/Admin.model';
import { Event } from 'src/app/shared/models/Event.model';
import { Forum } from 'src/app/shared/models/Forum.model';
import { Response } from 'src/app/shared/models/Response.model';
import { User } from 'src/app/shared/models/User.model';
import { environment } from 'src/env/env';

const ADMINURL = `${environment.host}/dashboard`;
const MEMBERSURL = `${environment.host}/members`;
const EVENTSURL = `${environment.host}/events`;
const FORUMSURL = `${environment.host}/forums`;

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  admin$: Observable<Response<Admin>> = new Observable<Response<Admin>>(
    (observer) => {
      observer.next({
        message: 'Admin retrieved succussfully',
        status: 200,
        data: this.admin,
      });
    }
  );
  admin!: Admin;

  private cacheAdmin() {
    console.log('Cached');
    this.http.get<Response<Admin>>(`${ADMINURL}/me`).subscribe((response) => {
      this.admin = response.data;
    });
  }
  getCurrentAdmin(): Observable<Response<Admin>> {
    if (this.admin) return this.admin$;
    else {
      this.cacheAdmin();
      return this.http.get<Response<Admin>>(`${ADMINURL}/me`);
    }
  }
  getAllRegistered(): Observable<Response<User>> {
    return this.http.get<Response<User>>(`${MEMBERSURL}/registered/all`);
  }
}

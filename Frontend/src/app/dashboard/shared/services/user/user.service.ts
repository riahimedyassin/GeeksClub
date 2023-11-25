import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/User.model';
import { environment } from 'src/env/env';
import { JwtService } from '../../../../services/auth/jwt.service';
import { Response } from 'src/app/shared/models/Response.model';

const URL = `${environment.host}/members`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private jwtService: JwtService) {}
  user$: Observable<Response<User>> = new Observable<Response<User>>(
    (observer) => {
      observer.next({
        message: 'User retrived succsfully',
        status: 200,
        data: <User>this.user,
      });
    }
  );
  user!: User | null;
  logout() {
    this.user = null;
    this.jwtService.removeToken();
  }
  public cacheUser() {
    this.user = null;
    this.http.get<Response<User>>(`${URL}/me/info`).subscribe((response) => {
      this.user = response.data;
    });
  }
  getCurrentUser(): Observable<Response<User>> {
    if (this.user) {
      console.log('cached');
      return this.user$;
    } else {
      this.cacheUser();
      return this.http.get<Response<User>>(`${URL}/me/info`);
    }
  }
  getTier(points: number): { title: string; icon: string } {
    if (points < 10) return { title: 'Hydrogene', icon: 'bot' };
    if (points > 10 && points < 50)
      return { title: 'Growing star', icon: 'star-half' };
    if (points > 50 && points < 100)
      return { title: 'Shiny star', icon: 'star' };
    if (points > 100 && points < 200)
      return { title: 'Brilliant star', icon: 'sparkle' };
    if (points > 200) return { title: 'Supernova', icon: 'sparkles' };
    return { title: 'AMZ', icon: 'STAR' };
  }
  getAllTiers() {
    return [
      { title: 'Hydrogene', icon: 'bot', descreption: 'Starter' },
      { title: 'Growing star', icon: 'star-half', descreption: 'New member' },
      { title: 'Shiny star', icon: 'star', descreption: 'Active member' },
      {
        title: 'Brilliant star',
        icon: 'sparkle',
        descreption: 'Productive member',
      },
      { title: 'Supernova', icon: 'sparkles', descreption: 'OG Member' },
    ];
  }
  registerMember(id: string) {
    return this.http.post(`${URL}/add/${id}`, {});
  }
  deleteMember(id: string) {
    return this.http.delete(`${URL}/${id}`);
  }
  getMemberDetails(id: string): Observable<Response<User>> {
    return this.http.get<Response<User>>(`${URL}/${id}`);
  }
  getAllMembers(page: string): Observable<Response<User[]>> {
    return this.http.get<Response<User[]>>(`${URL}/all/${page}`);
  }
  getAllRegistered(): Observable<Response<User[]>> {
    return this.http.get<Response<User[]>>(`${URL}/registered/all`);
  }
  updateMember(id: string, user: User) {
    return this.http.patch(`${URL}/me`, user);
  }
  uploadImage(link: string): Observable<Response<User>> {
    return this.http.post<Response<User>>(`${URL}/me/image`, { link });
  }
  getMembersLength(): Observable<Response<number>> {
    return this.http.get<Response<number>>(`${URL}/all/members/length`);
  }
  changePassword(oldPassword: string, newPassword: string) {
    return this.http.patch(`${URL}/me/password`, { oldPassword, newPassword });
  }
}

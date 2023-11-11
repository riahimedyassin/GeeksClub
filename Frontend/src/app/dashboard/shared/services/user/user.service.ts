import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, Subject, catchError } from 'rxjs';
import { User } from 'src/app/shared/models/User.model';
import { environment } from 'src/env/env';
import { JwtService } from '../../../../services/auth/jwt.service';
import { Response } from 'src/app/shared/models/Response.model';
import { HandleError } from '../../error/errorHandler';

const URL = `${environment.host}/members`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private errorHandler: HandleError
  ) {}
  user$: Observable<Response<User>> = new Observable<Response<User>>(
    (observer) => {
      observer.next({
        message: 'User retrived succsfully',
        status: 200,
        data: this.user,
      });
    }
  );
  user!: User;
  logout() {
    this.jwtService.removeToken();
  }
  cacheUser() {
    this.http
      .get<Response<User>>(`${URL}/me`)
      .pipe(catchError((error: any) => this.errorHandler.handle(error)))
      .subscribe((response) => {
        this.user = response.data;
      });
  }
  getCurrentUser(): Observable<Response<User>> {
    if (this.user) {
      return this.user$;
    } else {
      this.cacheUser()
      return this.http
        .get<Response<User>>(`${URL}/me`)
        .pipe(catchError((error: any) => this.errorHandler.handle(error)));
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
}

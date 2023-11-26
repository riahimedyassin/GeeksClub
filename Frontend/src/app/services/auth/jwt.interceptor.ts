import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private jwt: JwtService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.url.includes('https://api.cloudinary.com/v1_1/') ||
      request.url.includes('rapidapi.com')
    ) {
      return next.handle(request);
    }

    const jwtedRequest = request.clone({
      headers: request.headers.set(
        'authorization',
        `Bearer ${this.jwt.getToken()}`
      ),
    });
    return next.handle(jwtedRequest);
  }
}

// error.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError } from './errorHandler';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorHandler: HandleError) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('"Hola"')
        return this.errorHandler.handle(error);
      })
    );
  }
}

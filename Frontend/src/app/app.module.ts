import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { JwtInterceptor } from './services/auth/jwt.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavigationAnimationComponent } from './navigation-animation/navigation-animation.component';
import { ErrorInterceptor } from './shared/error/error.interceptor';


@NgModule({
  declarations: [AppComponent, NotFoundComponent, NavigationAnimationComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NavbarComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

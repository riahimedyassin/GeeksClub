import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { JwtInterceptor } from './services/auth/jwt.interceptor';
import { SkeletonProfileComponent } from './shared/components/skeleton-profile/skeleton-profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NavbarComponent],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:JwtInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}

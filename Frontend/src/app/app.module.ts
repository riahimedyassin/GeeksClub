import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { LucideAngularModule, icons  } from 'lucide-angular';
import { AboutusComponent } from './home/aboutus/aboutus.component';
import { RegisterComponent } from './home/register/register.component';
import { ActivitiesComponent } from './home/activities/activities.component';
import { ContactComponent } from './home/contact/contact.component';
import { NotificationComponent } from './shared/components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    HeaderComponent,
    AboutusComponent,
    RegisterComponent,
    ActivitiesComponent,
    ContactComponent,
    NotificationComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LucideAngularModule.pick(icons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

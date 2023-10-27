import { NgModule } from '@angular/core';
import { AboutusComponent } from './index/aboutus/aboutus.component';
import { RegisterComponent } from './register/register.component';
import { ActivitiesComponent } from './index/activities/activities.component';
import { ContactComponent } from './index/contact/contact.component';
import { NotificationComponent } from '../shared/components/notification/notification.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './index/header/header.component';
import { LucideAngularModule, icons  } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FounderComponent } from './founder/founder.component';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    HeaderComponent,
    AboutusComponent,
    RegisterComponent,
    ActivitiesComponent,
    ContactComponent,
    NotificationComponent,
    FooterComponent,
    IndexComponent,
    FounderComponent,
  ],
  imports : [HomeRoutingModule,LucideAngularModule.pick(icons) , CommonModule , ReactiveFormsModule] , 
  exports : [HomeRoutingModule]
})
export class HomeModule {}

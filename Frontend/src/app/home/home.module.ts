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
import { LucideAngularModule, icons } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { FeedbackComponent } from '../shared/components/feedback/feedback.component';
import { ActivityComponent } from './index/activities/activity/activity.component';
import { ShortenPipe } from '../shared/pipes/shorten.pipe';
import { ErrorComponent } from '../shared/components/error/error.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { TechJobsComponent } from './tech-jobs/tech-jobs.component';
import { LoadingComponent } from '../dashboard/shared/components/loading/loading.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    AboutusComponent,
    RegisterComponent,
    ActivitiesComponent,
    ContactComponent,
    AdminLoginComponent,
    IndexComponent,
    LoginComponent,

    FeedbackComponent,
    ActivityComponent,
    TechJobsComponent,
  ],
  imports: [
    HomeRoutingModule,
    LucideAngularModule.pick(icons),
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavbarComponent,
    FooterComponent,
    AlertComponent,
    ShortenPipe,
    ErrorComponent,
    NotificationComponent,
    LoadingComponent
  ],
  exports: [HomeRoutingModule],
})
export class HomeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FounderComponent } from './founder/founder.component';
import { StaticsRoutingModule } from './statics-routing.module';
import { PolicyComponent } from './policy/policy.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { LucideAngularModule, icons } from 'lucide-angular';
import { SponsoringComponent } from './sponsoring/sponsoring.component';
import { DetailsComponent } from './articles/article/details/details.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ErrorComponent } from '../shared/components/error/error.component';
import { MainComponent } from './main/main.component';
import { DonateComponent } from './donate/donate.component';
import { ReposComponent } from './founder/repos/repos.component';
import { LoadingComponent } from '../dashboard/shared/components/loading/loading.component';



@NgModule({
  declarations: [
    FounderComponent,
    PolicyComponent,
    SponsoringComponent,
    DetailsComponent,
    MainComponent,
    DonateComponent,
    ReposComponent
  ],
  imports: [
    CommonModule,
    StaticsRoutingModule,
    NavbarComponent,
    LucideAngularModule.pick(icons), 
    FooterComponent,
    ErrorComponent,
    LoadingComponent
  ],
  exports: [StaticsRoutingModule]
})
export class StaticsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FounderComponent } from './founder/founder.component';
import { StaticsRoutingModule } from './statics-routing.module';
import { PolicyComponent } from './policy/policy.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { LucideAngularModule, icons } from 'lucide-angular';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './articles/article/article.component';
import { SponsoringComponent } from './sponsoring/sponsoring.component';
import { DetailsComponent } from './articles/article/details/details.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ErrorComponent } from '../shared/components/error/error.component';
import { MainComponent } from './main/main.component';
import { DonateComponent } from './donate/donate.component';



@NgModule({
  declarations: [
    FounderComponent,
    PolicyComponent,
    SponsoringComponent,
    DetailsComponent,
    MainComponent,
    DonateComponent
  ],
  imports: [
    CommonModule,
    StaticsRoutingModule,
    NavbarComponent,
    LucideAngularModule.pick(icons), 
    FooterComponent,
    ErrorComponent
  ],
  exports: [StaticsRoutingModule]
})
export class StaticsModule { }

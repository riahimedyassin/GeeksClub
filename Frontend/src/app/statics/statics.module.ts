import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FounderComponent } from './founder/founder.component';
import { StaticsRoutingModule } from './statics-routing.module';
import { PolicyComponent } from './policy/policy.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';



@NgModule({
  declarations: [
    FounderComponent,
    PolicyComponent
  ],
  imports: [
    CommonModule,
    StaticsRoutingModule,
    NavbarComponent
  ],
  exports: [StaticsRoutingModule]
})
export class StaticsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './shared/components/navbar/search/search.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { SkeletonProfileComponent } from '../shared/components/skeleton-profile/skeleton-profile.component';


@NgModule({
  providers: [],
  declarations: [NavbarComponent, MainComponent, SearchComponent, ProfileComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LucideAngularModule.pick(icons),
    SkeletonProfileComponent
  ],
})
export class DashboardModule {}

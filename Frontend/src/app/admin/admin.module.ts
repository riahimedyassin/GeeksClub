import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LucideAngularModule, icons } from 'lucide-angular';
import { HttpClientModule } from '@angular/common/http';
import { MembersComponent } from './members/members.component';
import { EventsComponent } from './events/events.component';
import { ForumsComponent } from './forums/forums.component';
import { AdminsComponent } from './admins/admins.component';
import { SkeletonProfileComponent } from '../shared/components/skeleton-profile/skeleton-profile.component';
import { LoadingComponent } from '../dashboard/shared/components/loading/loading.component';
import { OverviewBlockComponent } from './home/overview-block/overview-block.component';
import { QuickActionComponent } from './home/quick-action/quick-action.component';
import { MemberComponent } from './members/member/member.component';
import { ListMembersComponent } from './members/list-members/list-members.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../shared/components/alert/alert.component';


@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    NavbarComponent,
    FooterComponent,
    MembersComponent,
    EventsComponent,
    ForumsComponent,
    AdminsComponent,
    OverviewBlockComponent,
    QuickActionComponent,
    MemberComponent,
    ListMembersComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LucideAngularModule.pick(icons),
    HttpClientModule,
    SkeletonProfileComponent,
    LoadingComponent,
    FormsModule,
    AlertComponent
  ],
})
export class AdminModule {}

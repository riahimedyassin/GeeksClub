import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { MembersComponent } from './members/members.component';
import { EventsComponent } from './events/events.component';
import { ForumsComponent } from './forums/forums.component';
import { AdminsComponent } from './admins/admins.component';
import { ListMembersComponent } from './members/list-members/list-members.component';
import { MemberComponent } from './members/member/member.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'members',
        component: MembersComponent,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: ListMembersComponent,
          },
          {
            path: ':id',
            component: MemberComponent,
          },
          
        ],
      },
      {
        path: 'events',
        component: EventsComponent,
      },
      {
        path: 'forums',
        component: ForumsComponent,
      },
      {
        path: 'admins',
        component: AdminsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

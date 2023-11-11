import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardGuard } from './guards/dashboard.guard';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { SelectedEventComponent } from './events/selected-event/selected-event.component';
import { ForumsComponent } from './forums/forums.component';
import { SelectedForumComponent } from './forums/selected-forum/selected-forum.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [dashboardGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Geeks Club | Profile',
      },
      {
        path:'leaderboard',component:LeaderboardComponent
      },
      {
        path: 'forums',
        children: [
          { path: '', component: ForumsComponent },
          { path: ':id', component: SelectedForumComponent },
        ],
      },
      {
        path: 'events',
        children: [
          { path: '', component: EventsComponent },
          { path: ':id', component: SelectedEventComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

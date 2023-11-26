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
import { ListForumsComponent } from './forums/list-forums/list-forums.component';
import { ListEventsComponent } from './events/list-events/list-events.component';
import { TechNewsComponent } from './tech-news/tech-news.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [dashboardGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Geeks Club | Dashboard'
      },
      {
        path:'tech-news',
        component:TechNewsComponent,
        title: 'Geeks Club | Tech News'
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Geeks Club | Member Profile',
      },
      {
        path: 'leaderboard',
        component: LeaderboardComponent,
        title: 'Geeks Club | Leaderboard'
      },
      {
        path: 'forums',
        component: ForumsComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: ListForumsComponent,
            title: 'Geeks Club | Forums List'
          },
          { path: ':id', component: SelectedForumComponent ,  title: 'Geeks Club | Forum' },
        ],
      },
      {
        path: 'events',
        component: EventsComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: ListEventsComponent,
            title: 'Geeks Club | Events List'
          },
          { path: ':id', component: SelectedEventComponent ,  title: 'Geeks Club | Event' },
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

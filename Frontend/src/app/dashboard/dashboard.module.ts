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
import { SideNavbarComponent } from './shared/components/side-navbar/side-navbar.component';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { ShortenPipe } from '../shared/pipes/shorten.pipe';
import { ForumComponent } from './shared/components/forum/forum.component';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './events/event/event.component';
import { SelectedEventComponent } from './events/selected-event/selected-event.component';
import { FormsModule } from '@angular/forms';
import { CommentsComponent } from './events/selected-event/comments/comments.component';
import { ForumsComponent } from './forums/forums.component';
import { SelectedForumComponent } from './forums/selected-forum/selected-forum.component';
import { ArticleComponent } from './forums/selected-forum/article/article.component';
import { NotificationComponent } from '../shared/components/notification/notification.component';

@NgModule({
  providers: [],
  declarations: [
    NavbarComponent,
    MainComponent,
    SearchComponent,
    ProfileComponent,
    SideNavbarComponent,
    HomeComponent,
    ForumComponent,
    EventsComponent,
    EventComponent,
    SelectedEventComponent,
    CommentsComponent,
    ForumsComponent,
    SelectedForumComponent,
    ArticleComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LucideAngularModule.pick(icons),
    SkeletonProfileComponent,
    LoadingComponent,
    ShortenPipe,
    FormsModule,
    NotificationComponent
    
  ],
})
export class DashboardModule {}

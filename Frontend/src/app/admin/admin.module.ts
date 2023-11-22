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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { ShortenPipe } from '../shared/pipes/shorten.pipe';
import { EventComponent } from './events/event/event.component';
import { ListEventsComponent } from './events/list-events/list-events.component';
import { ListForumsComponent } from './forums/list-forums/list-forums.component';
import { ForumComponent } from './forums/forum/forum.component';
import { NewForumComponent } from './forums/new-forum/new-forum.component';
import { NotificationComponent } from '../shared/components/notification/notification.component';
import { NewEventComponent } from './events/new-event/new-event.component';
import { TableColorDirective } from '../shared/directives/table-color.directive';
import { ArticlesComponent } from './articles/articles.component';
import { ProfileComponent } from './profile/profile.component';
import { ListAdminsComponent } from './admins/list-admins/list-admins.component';
import { NewAdminComponent } from './admins/new-admin/new-admin.component';
import { ListArticlesComponent } from './articles/list-articles/list-articles.component';
import { ArticleComponent } from './articles/article/article.component';
import { NewArticleComponent } from './articles/new-article/new-article.component';
import { PostComponent } from './forums/forum/post/post.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { SelectedAdminComponent } from './admins/selected-admin/selected-admin.component';


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
    EventComponent,
    ListEventsComponent,
    ListForumsComponent,
    ForumComponent,
    NewForumComponent,
    NewEventComponent,
    TableColorDirective,
    ArticlesComponent,
    ProfileComponent,
    ListAdminsComponent,
    NewAdminComponent,
    ArticleComponent,
    ListArticlesComponent,
    NewArticleComponent,
    PostComponent,
    VisitorsComponent,
    SelectedAdminComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LucideAngularModule.pick(icons),
    HttpClientModule,
    SkeletonProfileComponent,
    LoadingComponent,
    FormsModule,
    AlertComponent,
    ShortenPipe,
    ReactiveFormsModule,
    NotificationComponent
  ],
})
export class AdminModule {}

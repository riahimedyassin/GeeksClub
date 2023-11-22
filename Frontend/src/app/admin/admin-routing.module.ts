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
import { EventComponent } from './events/event/event.component';
import { ListEventsComponent } from './events/list-events/list-events.component';
import { ListForumsComponent } from './forums/list-forums/list-forums.component';
import { ForumComponent } from './forums/forum/forum.component';
import { NewForumComponent } from './forums/new-forum/new-forum.component';
import { NewEventComponent } from './events/new-event/new-event.component';
import { ProfileComponent } from './profile/profile.component';
import { ListAdminsComponent } from './admins/list-admins/list-admins.component';
import { NewAdminComponent } from './admins/new-admin/new-admin.component';
import { newAdminGuard } from './shared/guards/new-admin.guard';
import { isSuperAdminResolver } from './shared/resolvers/is-super-admin.resolver';
import { ArticlesComponent } from './articles/articles.component';
import { ListArticlesComponent } from './articles/list-articles/list-articles.component';
import { NewArticleComponent } from './articles/new-article/new-article.component';
import { ArticleComponent } from './articles/article/article.component';
import { PostComponent } from './forums/forum/post/post.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { SelectedAdminComponent } from './admins/selected-admin/selected-admin.component';

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
        path: 'visitors',
        component: VisitorsComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'articles',
        component: ArticlesComponent,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: ListArticlesComponent,
          },
          {
            path: 'new',
            component: NewArticleComponent,
          },
          {
            path: ':id',
            component: ArticleComponent,
          },
        ],
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
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: ListEventsComponent },
          { path: 'new', component: NewEventComponent },
          { path: ':id', component: EventComponent },
        ],
      },
      {
        path: 'forums',
        component: ForumsComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: ListForumsComponent },
          { path: 'new', component: NewForumComponent },
          {
            path: ':id',
            children: [
              { path: '', component: ForumComponent, pathMatch: 'full' },
              { path: ':post', component: PostComponent },
            ],
          },
        ],
      },
      {
        path: 'admins',
        component: AdminsComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: ListAdminsComponent,
            resolve: {
              isSup: isSuperAdminResolver,
            },
          },
          {
            path: 'new',
            component: NewAdminComponent,
            canActivate: [newAdminGuard],
          },
          {
            path:':id',
            component : SelectedAdminComponent,
            canActivate:[newAdminGuard]
          }
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

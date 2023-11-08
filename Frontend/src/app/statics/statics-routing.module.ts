import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FounderComponent } from './founder/founder.component';
import { PolicyComponent } from './policy/policy.component';
import { SponsoringComponent } from './sponsoring/sponsoring.component';
import { ArticlesComponent } from './articles/articles.component';
import { DetailsComponent } from './articles/article/details/details.component';
import { ArticlesService } from '../services/articles/articles.service';

const routes: Routes = [
  {
    path: '',
    component: PolicyComponent,
    pathMatch: 'full',
  },

  {
    path: 'founder',
    component: FounderComponent,
  },
  {
    path: 'policy',
    component: PolicyComponent,
  },
  {
    path: 'sponsoring',
    component: SponsoringComponent,
  },
  {
    path: 'articles',
    children: [
      { path: '', loadComponent: () => import('./articles/articles.component').then(c=> c.ArticlesComponent)  },
      { path: ':id', component: DetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaticsRoutingModule {}

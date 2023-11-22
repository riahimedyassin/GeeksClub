import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FounderComponent } from './founder/founder.component';
import { PolicyComponent } from './policy/policy.component';
import { SponsoringComponent } from './sponsoring/sponsoring.component';
import { DetailsComponent } from './articles/article/details/details.component';
import { MainComponent } from './main/main.component';
import { DonateComponent } from './donate/donate.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'policy' , pathMatch:'full' },
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
        path:'donate',
        component:DonateComponent
      },
      {
        path: 'articles',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./articles/articles.component').then(
                (c) => c.ArticlesComponent
              ),
          },
          { path: ':id', component: DetailsComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaticsRoutingModule {}

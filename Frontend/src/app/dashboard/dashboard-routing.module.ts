import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardGuard } from './guards/dashboard.guard';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [dashboardGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        title :'Geeks Club | Profile'
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

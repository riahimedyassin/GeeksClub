import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';

import { LoginComponent } from './login/login.component';
import { loginGuard } from './guards/login.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    children: [
      { path: '', redirectTo: 'member' , pathMatch:'full' },
      { path: 'member', component: LoginComponent , canActivate: [loginGuard] },
      { path: 'admin', component: AdminLoginComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

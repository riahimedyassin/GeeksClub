import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';

import { LoginComponent } from './login/login.component';
import { loginGuard } from './guards/login.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { adminLoginGuard } from './guards/admin-login.guard';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full',
    title: 'Geeks Club | Home',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Geeks Club | Register',
  },
  {
    path: 'login',

    children: [
      { path: '', redirectTo: 'member', pathMatch: 'full' },
      {
        path: 'member',
        component: LoginComponent,
        canActivate: [loginGuard],
        title: 'Geeks Club | Login Member',
      },
      {
        path: 'admin',
        component: AdminLoginComponent,
        title: 'Geeks Club | Login Admin',
        canActivate: [adminLoginGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FounderComponent } from './founder/founder.component';
import { PolicyComponent } from './policy/policy.component';

const routes: Routes = [
    {
        path:'' , 
        component:PolicyComponent  ,
        pathMatch:'full'
    },

  {
    path: 'founder',
    component: FounderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaticsRoutingModule {}

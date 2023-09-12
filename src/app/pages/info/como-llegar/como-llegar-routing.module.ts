import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComoLlegarPage } from './como-llegar.page';

const routes: Routes = [
  {
    path: '',
    component: ComoLlegarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComoLlegarPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenarPage } from './ordenar.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenarPageRoutingModule {}

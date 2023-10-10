import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisOrdenesPage } from './mis-ordenes.page';

const routes: Routes = [
  {
    path: '',
    component: MisOrdenesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisOrdenesPageRoutingModule {}

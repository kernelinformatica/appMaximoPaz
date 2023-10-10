import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedirDineroPage } from './pedir-dinero.page';

const routes: Routes = [
  {
    path: '',
    component: PedirDineroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedirDineroPageRoutingModule {}

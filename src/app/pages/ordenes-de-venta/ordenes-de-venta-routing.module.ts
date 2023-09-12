import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenesDeVentaPage } from './ordenes-de-venta.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenesDeVentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenesDeVentaPageRoutingModule {}

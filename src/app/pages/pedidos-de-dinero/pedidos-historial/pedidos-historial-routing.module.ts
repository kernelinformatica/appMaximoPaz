import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosHistorialPage } from './pedidos-historial.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosHistorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosHistorialPageRoutingModule {}

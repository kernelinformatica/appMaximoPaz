import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosDeDineroPage } from './pedidos-de-dinero.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosDeDineroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosDeDineroPageRoutingModule {}

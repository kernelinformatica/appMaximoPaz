
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosDeDineroPage } from './pedidos-de-dinero.page';

const routes: Routes = [

  {
    path: '',
    component: PedidosDeDineroPage,
    children: [
      {
        path: 'pedir-dinero',
        loadChildren: () => import('./pedir-dinero/pedir-dinero.module').then(m => m.PedirDineroPageModule)
      },
      {
        path: 'mis-pedidos',
        loadChildren: () => import('./mis-pedidos/mis-pedidos.module').then( m => m.MisPedidosPageModule)
      },
      {
        path: 'pedidos-historial',
        loadChildren: () => import('./pedidos-historial/pedidos-historial.module').then( m => m.PedidosHistorialPageModule)
      },
    ]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosDeDineroPageRoutingModule {}

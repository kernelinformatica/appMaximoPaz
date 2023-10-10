import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenesDeVentaPage } from './ordenes-de-venta.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenesDeVentaPage,
    children: [
      {
        path: 'ordenar',
        loadChildren: () => import('./ordenar/ordenar.module').then( m => m.OrdenarPageModule)
      },
      {
        path: 'mis-ordenes',
        loadChildren: () => import('./mis-ordenes/mis-ordenes.module').then( m => m.MisOrdenesPageModule)
      }

    ]

  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },
 /* {
    path: 'ordenar',
    loadChildren: () => import('./ordenar/ordenar.module').then( m => m.OrdenarPageModule)
  },
  {
    path: 'mis-ordenes',
    loadChildren: () => import('./mis-ordenes/mis-ordenes.module').then( m => m.MisOrdenesPageModule)
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenesDeVentaPageRoutingModule {}

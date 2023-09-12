import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleCtactePage } from './detalle-ctacte.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleCtactePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleCtactePageRoutingModule {}

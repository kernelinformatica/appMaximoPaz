import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MercadoCerealesPage } from './mercado-cereales.page';

const routes: Routes = [
  {
    path: '',
    component: MercadoCerealesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MercadoCerealesPageRoutingModule {}

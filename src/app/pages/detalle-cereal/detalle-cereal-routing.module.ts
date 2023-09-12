import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleCerealPage } from './detalle-cereal.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleCerealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleCerealPageRoutingModule {}

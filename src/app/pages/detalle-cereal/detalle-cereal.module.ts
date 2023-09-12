import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleCerealPageRoutingModule } from './detalle-cereal-routing.module';
import { PipesModule } from "../../pipes/pipes.module";
import { DetalleCerealPage } from './detalle-cereal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleCerealPageRoutingModule,
    PipesModule
  ],
  declarations: [DetalleCerealPage]
})
export class DetalleCerealPageModule {}

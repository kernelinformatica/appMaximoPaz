import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisOrdenesPageRoutingModule } from './mis-ordenes-routing.module';

import { MisOrdenesPage } from './mis-ordenes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisOrdenesPageRoutingModule
  ],
  declarations: [MisOrdenesPage]
})
export class MisOrdenesPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenesDeVentaPageRoutingModule } from './ordenes-de-venta-routing.module';

import { OrdenesDeVentaPage } from './ordenes-de-venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenesDeVentaPageRoutingModule
  ],
  declarations: [OrdenesDeVentaPage]
})
export class OrdenesDeVentaPageModule {}

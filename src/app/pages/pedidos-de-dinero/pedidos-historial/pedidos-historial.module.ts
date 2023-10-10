import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosHistorialPageRoutingModule } from './pedidos-historial-routing.module';

import { PedidosHistorialPage } from './pedidos-historial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosHistorialPageRoutingModule
  ],
  declarations: [PedidosHistorialPage]
})
export class PedidosHistorialPageModule {}

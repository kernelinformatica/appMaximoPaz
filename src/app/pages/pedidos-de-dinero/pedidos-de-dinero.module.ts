import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosDeDineroPageRoutingModule } from './pedidos-de-dinero-routing.module';

import { PedidosDeDineroPage } from './pedidos-de-dinero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosDeDineroPageRoutingModule
  ],
  declarations: [PedidosDeDineroPage]
})
export class PedidosDeDineroPageModule {}

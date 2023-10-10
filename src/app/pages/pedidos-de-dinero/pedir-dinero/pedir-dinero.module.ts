import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedirDineroPageRoutingModule } from './pedir-dinero-routing.module';

import { PedirDineroPage } from './pedir-dinero.page';
import { TransaccionesService } from 'src/app/services/transacciones-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedirDineroPageRoutingModule,


  ],
  declarations: [PedirDineroPage]
})
export class PedirDineroPageModule {

}

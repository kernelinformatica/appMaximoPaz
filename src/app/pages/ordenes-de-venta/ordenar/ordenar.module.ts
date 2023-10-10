import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenarPageRoutingModule } from './ordenar-routing.module';

import { OrdenarPage } from './ordenar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenarPageRoutingModule
  ],
  declarations: [OrdenarPage]
})
export class OrdenarPageModule {}

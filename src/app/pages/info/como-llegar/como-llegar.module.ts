import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComoLlegarPageRoutingModule } from './como-llegar-routing.module';

import { ComoLlegarPage } from './como-llegar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComoLlegarPageRoutingModule
  ],
  declarations: [ComoLlegarPage]
})
export class ComoLlegarPageModule {}

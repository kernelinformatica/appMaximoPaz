import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MercadoCerealesPageRoutingModule } from './mercado-cereales-routing.module';

import { MercadoCerealesPage } from './mercado-cereales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MercadoCerealesPageRoutingModule
  ],
  declarations: [MercadoCerealesPage]
})
export class MercadoCerealesPageModule {}

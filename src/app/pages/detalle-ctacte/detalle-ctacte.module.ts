import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleCtactePageRoutingModule } from './detalle-ctacte-routing.module';

import { DetalleCtactePage } from './detalle-ctacte.page';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [DetalleCtactePage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DetalleCtactePageRoutingModule,
        PipesModule
    ]
})
export class DetalleCtactePageModule {}

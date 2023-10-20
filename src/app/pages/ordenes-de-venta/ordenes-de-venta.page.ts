import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { OrdenesVentaService } from 'src/app/services/ordenes-venta.service';
@Component({
  selector: 'app-ordenes-de-venta',
  templateUrl: './ordenes-de-venta.page.html',
  styleUrls: ['./ordenes-de-venta.page.scss'],
})
export class OrdenesDeVentaPage implements OnInit {

  constructor(   public ordenesDeVentaService:OrdenesVentaService,

    public alertCtrl: AlertController,
    private router: Router,
    public loadingController : LoadingController) {



     }
     public ordenesVentaPendientes : any[] = [];
    public cantidadPendiente: any = 0 ;
  ngOnInit() {
    // traigo las ordenes pendientes
    this.ordenesDeVentaService.load().then(async (resp: any) => {
      const origen = resp.ordenesDeVenta;
      this.ordenesVentaPendientes = origen.filter((item : any) => item.idEstado.abreviatura == 'P');
      this.cantidadPendiente = this.ordenesVentaPendientes.length

    })
 }

}

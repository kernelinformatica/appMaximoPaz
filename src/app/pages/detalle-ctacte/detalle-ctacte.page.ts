import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { DetalleCtaCteService } from 'src/app/services/detallectacte.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-detalle-ctacte',
  templateUrl: './detalle-ctacte.page.html',
  styleUrls: ['./detalle-ctacte.page.scss'],
})
export class DetalleCtactePage implements OnInit {
  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public cuenta: any;         // Usado para almacenar los datos de la cuenta
  public detalleCtaCte: any;  // Usado para almacenar respuesta del servicio
  public historico: any;      // Usado para filtrar por historico
  public socio: any;
  public saldoDeudorAcreedor: String | undefined;
  public importeEstadoSaldos: String | undefined
  data: any;
  istodoCargado = false;

  constructor(public detallaCtaCteService: DetalleCtaCteService,
              private route: ActivatedRoute,
              private uiService: UiService,
              private navController: NavController,
              private loadingController: LoadingController) {
    this.historico = 'N';
  }

  async ngOnInit() {
    await this.uiService.presentLoading();

    const cuenta = this.route.snapshot.queryParamMap.get("cuenta");
    const socio = this.route.snapshot.queryParamMap.get("socio");

    this.cuenta = cuenta;
    this.socio = socio;
    
    this.detallaCtaCteService.load().then(
      async resp => {
        this.data = resp;
        this.detalleCtaCte = this.data.detalleCtaCte;

        this.istodoCargado = true;
        await this.loadingController.dismiss();
      });
  }


  public getSaldoCtaCteActual() {
    if (this.cuenta.saldo < 0) {
      // acreedor
      this.saldoDeudorAcreedor = "ACREEDOR";
      this.importeEstadoSaldos = 'headerImporteCtacteResaltadoNegativo';

    } else {
      // deudor
      this.saldoDeudorAcreedor = "DEUDOR";
      this.importeEstadoSaldos = 'headerImporteCtacteResaltadoPositivo';

    }
    return this.cuenta.saldo;

  }
  public mostrarHistorico() {
    this.historico = 'S';
  }

}

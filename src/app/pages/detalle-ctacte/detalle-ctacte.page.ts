import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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

  data: any;
  istodoCargado = false;

  constructor(public detallaCtaCteService: DetalleCtaCteService,
              private route: ActivatedRoute,
              private uiService: UiService,
              private loadingController: LoadingController) {
    this.historico = 'N';
  }

  async ngOnInit() {
    await this.uiService.presentLoading();

    const cuenta = this.route.snapshot.queryParamMap.get("cuenta");
    if(cuenta){
      this.cuenta = cuenta;
    }

    this.detallaCtaCteService.load().then(
      async resp => {
        this.data = resp;
        this.detalleCtaCte = this.data.detalleCtaCte;
        this.istodoCargado = true;
        await this.loadingController.dismiss();
      });
  }

  public mostrarHistorico() {
    this.historico = 'S';          
  }

}

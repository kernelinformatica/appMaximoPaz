import { Component, OnInit } from '@angular/core';
import { UiService } from './../../../services/ui.service';
import { LoadingController } from '@ionic/angular';


//------------IMPORTO LOS SERVICIOS DE QUE NECESITO ------------//

import { Router } from '@angular/router';
import { BancosService } from 'src/app/services/bancos-service';
import { CbuPadronService } from 'src/app/services/cbupadron-service';
import { TransaccionesService } from 'src/app/services/transacciones-service';
import { SucursalesService } from 'src/app/services/sucursales-service';
import { SolicitudFondosService } from 'src/app/services/solicitudfondos-service';
import { SolicitudFondos } from 'src/app/modelo/pedidos-fondos/solicitud-fondos';
import { ChequerasService } from 'src/app/services/chequeras-service';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { ResumenService } from 'src/app/services/resumen.service';
import { Usuario } from 'src/app/modelo/usuario';
@Component({
  selector: 'app-pedidos-historial',
  templateUrl: './pedidos-historial.page.html',
  styleUrls: ['./pedidos-historial.page.scss'],
})
export class PedidosHistorialPage implements OnInit {
   //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//

  public aSolicitar: SolicitudFondos = new SolicitudFondos(null);
  public fechaSeleccionada!: string;
  public now!: Date;
  public minDate!: number;
  public maxDate!: string;
  public usuarioActual: any;
  public fondos_h : any;
  public colorEstado!: string;
  public respuesta: any = "";
  public cantidadDePedidos: any = 0;
  constructor(public navCtrl: NavController,
    public resumenService:ResumenService,
    public uiService: UiService,
    public chequerasService: ChequerasService,
    public cbuPadronService: CbuPadronService,
    public transaccionesService: TransaccionesService,
    public sucursalesService: SucursalesService,
    public solicitudFondosService: SolicitudFondosService,
    public alertCtrl: AlertController,
    private router: Router,
    public loadingController : LoadingController) {



    }

  async ngOnInit() {
    const usuarioActualStr = localStorage.getItem('usuarioActual');
    if (usuarioActualStr) {
      this.usuarioActual = JSON.parse(usuarioActualStr);
      this.fechaSeleccionada = "";
      this.now = new Date();
     // this.minDate = this.now.getFullYear();
     // this.maxDate = new Date(this.now.getFullYear() + 2, this.now.getMonth() + 1, this.now.getDate()).toISOString();
      this.fechaSeleccionada = new Date().toISOString();
     await this.uiService.presentLoading("Cargando...")
       this.solicitudFondosService.traerHistorialFondos().then(async (resp:any) => {
       this.fondos_h = resp.respuesta;
       resp = "";
      this.cantidadDePedidos = this.fondos_h.length;
       this.uiService.dissmisLoading();

     }).catch(async error => {

      this.uiService.dissmisLoading();
       this.uiService.presentAlertInfo(error.error)

     });


    }else{

      this.router.navigateByUrl("/logout");

    }
  }


  formatoFecha(fe:string){
    return this.uiService.parseFecha(fe);

  }
  colorSt(idEstado: number){

    if (idEstado == 1 ){
      return "light";
    }else if (idEstado == 2){
      return 'success';
    }else if (idEstado == 4){
      return 'danger';
    }else if (idEstado == 5){
      return 'medium';
    }else{
      return "light";
    }

  }

}

import { catchError } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { UiService } from './../../../services/ui.service';
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.page.html',
  styleUrls: ['./mis-pedidos.page.scss'],
})
export class MisPedidosPage implements OnInit {
    //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//

  private iconoReservaProductos = 'add';  // Usado para mostrar el icono que corresponde
  private iconoOrdenesDeVenta = 'albums';  // Usado para mostrar el icono que corresponde
  private iconoEnvioDeCamiones = 'bus';  // Usado para mostrar el icono que corresponde
  private iconoPedidoDeFondos = 'logo-usd';
  private iconoDescargaEnPlanta = 'download';  // Usado para mostrar el icono que corresponde  // Usado para mostrar el icono que corresponde
  public aSolicitar: SolicitudFondos = new SolicitudFondos(null);
  public fechaSeleccionada!: string;
  public now!: Date;
  public minDate!: number;
  public maxDate!: string;
  public usuarioActual: any;
  public fondos_m : any;
  public colorEstado!: string;
  public cantidadRegistros: any = 0;
  //---------------------------------------------//

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

      const usuarioActualStr = localStorage.getItem('usuarioActual');
      if (usuarioActualStr) {
        this.usuarioActual = JSON.parse(usuarioActualStr);
        this.fechaSeleccionada = "";
        this.now = new Date();
        this.minDate = this.now.getFullYear();
        this.maxDate = new Date(this.now.getFullYear() + 2, this.now.getMonth() + 1, this.now.getDate()).toISOString();


       this.buscarFormulario();


       this.fechaSeleccionada = new Date().toISOString();
       this.aSolicitar.fechaCobro = new Date(this.now.getUTCFullYear(), this.now.getUTCMonth(), this.now.getUTCDate());
       //

      }else{
        // redirecciono a login
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
      }else if (idEstado == 3){
        return 'danger';
      }else if (idEstado == 5){
        return 'success';
      }else{
        return "light";
      }

    }

 public buscarFormulario() {
      this.cbuPadronService.loadCbus();
      this.sucursalesService.load();
      this.chequerasService.load();
  }
  async ngOnInit() {
    await this.uiService.presentLoading("Cargando...")
      this.solicitudFondosService.load().then(async (resp: any) => {
      this.uiService.dissmisLoading();
      this.fondos_m = resp.respuesta;
      resp = "";
      this.cantidadRegistros = this.fondos_m.length

      }).catch(error => {
        //this.uiService.dissmisLoading();
        this.uiService.presentAlertInfo(error.error);
        console.error(error);
      });

  }

}


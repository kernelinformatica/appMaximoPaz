import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


import { Component, OnInit } from '@angular/core';
import { SolicitudFondos } from 'src/app/modelo/pedidos-fondos/solicitud-fondos';




/*
  Servicios necesarios
*/
import { UiService } from 'src/app/services/ui.service';
import { TransaccionesService } from 'src/app/services/transacciones-service';
import { CbuPadronService } from 'src/app/services/cbupadron-service';
import { SucursalesService } from 'src/app/services/sucursales-service';
import { ChequerasService } from 'src/app/services/chequeras-service';
import { SolicitudFondosService } from 'src/app/services/solicitudfondos-service';
import { Configuraciones } from 'src/configuraciones/configuraciones';
import { TransaccionFondos } from 'src/app/modelo/pedidos-fondos/transaccion-fondos';
import { TipoTransaccion } from 'src/app/modelo/pedidos-fondos/tipo-transaccion';

import { Sucursal } from 'src/app/modelo/sucursal';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-pedir-dinero',
  templateUrl: './pedir-dinero.page.html',
  styleUrls: ['./pedir-dinero.page.scss'],
})
export class PedirDineroPage implements OnInit {
    //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//

  private iconoReservaProductos = 'add';  // Usado para mostrar el icono que corresponde
  private iconoOrdenesDeVenta = 'albums';  // Usado para mostrar el icono que corresponde
  private iconoEnvioDeCamiones = 'bus';  // Usado para mostrar el icono que corresponde
  private iconoPedidoDeFondos = 'logo-usd';
  private iconoDescargaEnPlanta = 'download';  // Usado para mostrar el icono que corresponde  // Usado para mostrar el icono que corresponde
  public aSolicitar: SolicitudFondos = new SolicitudFondos(null);
  public fechaSeleccionada: any;
  public fechaMinimaPermitida: any
  public fechaCobroSeleccionada: Date = new Date();
  public now!: Date;
  public fecha:any;
  public minDate!: number;
  public maxDate!: string ;
  public usuarioActual: any;
  public estaTodoCargado : any;
  public razon : string | undefined;
  public data: any;
  public debugger : any;
  public transacciones: any
  public sucursales: Sucursal[] = [];
  public cbuSocios : any;
  public urlVer: any;
  fechaCobro!: Date;
  fechaHoy!: Date;
   isTransaccionValid = false;
   isCbuValid = false;
    isImporteValid = false;
    isChequeraValid = false;
    isSucursalValid = false;
    isFechaCobroValid = false;
    isValidoRangoFecha = false;
  constructor(
     public uiService: UiService,
     public chequerasService: ChequerasService,
     public cbuPadronService: CbuPadronService,
     public transaccionesService: TransaccionesService,
     public sucursalesService: SucursalesService,
     public solicitudFondosService: SolicitudFondosService,
     public loadingController: LoadingController,
     private router: Router

    ) {

      const usuarioActualStr = localStorage.getItem('usuarioActual');
      if (usuarioActualStr) {
        this.fechaMinimaPermitida = new Date().toString();
        this.usuarioActual = JSON.parse(usuarioActualStr);
        this.fechaHoy = new Date();
        this.fechaCobro = new Date(this.fechaHoy.getUTCFullYear(), this.fechaHoy.getUTCMonth(), this.fechaHoy.getUTCDate() + 10);
        this.now = new Date();
        this.minDate = this.now.getFullYear();

        this.inicializar()
      }else{

        this.router.navigateByUrl("/logout");
      }






     }
     async  cargarTiposDeTransacciones(){

         this.transaccionesService.loadTransaccionesTipos().then(async(respuesta) => {
          this.loadingController.dismiss();

        });
     }




     async  cargarCbuSocios(){
      this.cbuPadronService.loadCbus().then(async(cbus) => {
       this.cbuSocios = cbus;

      });
   }



  logForm() {
   // this.uiService.presentLoading("Solicitando $"+this.aSolicitar.importe+" pesos...")
   //this.fechaSeleccionada = new Date();
   this.fechaCobroSeleccionada = new Date();
   this.uiService.dissmisLoading();
   this.solicitudFondosService.crearSolicitud(this.aSolicitar)
   this.aSolicitar = new SolicitudFondos(null);


  }


  public checkDisable() : boolean {



    if(this.aSolicitar.tipoTransaccion && this.aSolicitar.tipoTransaccion.idTransaccion && this.aSolicitar.tipoTransaccion.idTransaccion.idTransaccion == 6) {

      this.isTransaccionValid = true;
      this.isCbuValid = (this.aSolicitar.destinoCbuPadron && this.aSolicitar.destinoCbuPadron.cbu) ? true : false;
      this.isImporteValid = (this.aSolicitar.importe && this.aSolicitar.importe > 0) ? true : false;
      this.isValidoRangoFecha = this.verificoFechas() ? true: false;
      return !( this.isTransaccionValid &&  this.isCbuValid &&  this.isImporteValid && this.isValidoRangoFecha );

    }
    if(this.aSolicitar.tipoTransaccion && this.aSolicitar.tipoTransaccion.idTransaccion && this.aSolicitar.tipoTransaccion.idTransaccion.idTransaccion == 7) {
      this.isTransaccionValid = true;
      this.isChequeraValid = (this.aSolicitar.idChequera && this.aSolicitar.idChequera.idChequera) ? true : false;
      this.isSucursalValid = (this.aSolicitar.sucursal && this.aSolicitar.sucursal.idSucursal) ? true : false;
      this.isImporteValid = (this.aSolicitar.importe && this.aSolicitar.importe >= 1000) ? true : false;

      this.isValidoRangoFecha =this.verificoFechas()  ? true: false;

      return !(this.isTransaccionValid && this.isChequeraValid && this.isSucursalValid && this.isImporteValid && this.isValidoRangoFecha    );
    }


    return true;
  }

  public asignarFecha() {

    let fechaParseadaTemp = this.fechaSeleccionada.split("T")
    let fechaParseada= fechaParseadaTemp[0]
    this.aSolicitar.fechaCobro = fechaParseada;


 }



  async  cargarSucursales(){

     this.sucursalesService.load().then(async(resp) => {
      //responde

   });

  }


  verificoFechas(){
    const fechaSeleccionada = new Date(this.fechaSeleccionada);
    const fechaHoy = new Date()

    if (fechaSeleccionada.getTime() > fechaHoy.getTime()) {
      return true
    } else if (fechaSeleccionada.getTime() < fechaHoy.getTime()) {
      return false
    } else {
     return false
    }

  }


  async cargarChequeras(){
     ////this.chequerasService.load();
     this.chequerasService.load().then(async(respuesta) => {
     // this.loadingController.dismiss();

    });
  }





 public inicializar() {
    this.cargarTiposDeTransacciones();
    this.cargarCbuSocios();
    this.cargarSucursales()
    this.cargarChequeras();
    this.estaTodoCargado = false
}


  ngOnInit() {
    this.razon = Configuraciones.razonSocialCliente;
    this.maxDate = new Date(this.now.getFullYear() + 2, 11, 31).toISOString();
    this.fechaMinimaPermitida = this.uiService.parseFecha(new Date(this.now.getFullYear() ,this.fechaHoy.getUTCMonth(), this.fechaHoy.getUTCDate()).toISOString());
    this.fecha = new Date(this.now.getFullYear() ,this.fechaHoy.getUTCMonth(), this.fechaHoy.getUTCDate()).toISOString();

  }

}

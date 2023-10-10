import { OrdenesVentaService } from './../../../services/ordenes-venta.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//

  private iconoReservaProductos = 'add';  // Usado para mostrar el icono que corresponde
  private iconoOrdenesDeVenta = 'albums';  // Usado para mostrar el icono que corresponde
  private iconoEnvioDeCamiones = 'bus';  // Usado para mostrar el icono que corresponde
  private iconoPedidoDeFondos = 'logo-usd';
  private iconoDescargaEnPlanta = 'download';  // Usado para mostrar el icono que corresponde  // Usado para mostrar el icono que corresponde

  public fechaSeleccionada!: string;
public fechaCobro!:String;
  public now!: Date;
  public minDate!: number;
  public maxDate!: string;
  public usuarioActual: any;
  public ordenes : any;
  public colorEstado!: string;
  public cantidadRegistros: any = 0;
  public tituloPagina!: string;
  //---------------------------------------------//

  constructor(public navCtrl: NavController,
    public ordenesDeVentaService:OrdenesVentaService,
    public uiService: UiService,
    public ordenesVentasservices: OrdenesVentaService,
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
        this.fechaSeleccionada = new Date().toISOString();
       // this.uiService.presentLoading("Por favor espere...")
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
    return 'medium';
  }else{
    return "light";
  }

}



  ngOnInit() {


this.ordenesVentasservices.loadHistorial().then(async (resp: any) => {
      this.loadingController.dismiss()
      this.ordenes = resp.ordenesDeVenta;
      this.cantidadRegistros = this.ordenes.length;
      this.tituloPagina = "Historial de órdenes de venta: "+this.cantidadRegistros;


    });
  }

}

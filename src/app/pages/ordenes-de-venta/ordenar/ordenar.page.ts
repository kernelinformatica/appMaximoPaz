import { CerealResumen } from './../../../modelo/cerealResumen';

import { OrdenesDeVentaPage } from './../ordenes-de-venta.page';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ResumenService } from 'src/app/services/resumen.service';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';

// Servicios que necesito ////////////////
import { OrdenVentasMercadosService } from './../../../services/orden-ventas-mercados.service';
import { CerealesService } from 'src/app/services/cereales.service';
import { MonedasService } from 'src/app/services/monedas.service';
import { CerealResumenService } from 'src/app/services/cereal-resumen.service';
import { OrdenVenta } from 'src/app/modelo/ordenes-venta/ordenVenta';
import { OrdenesVentaService } from './../../../services/ordenes-venta.service';
//////////////////////////////////////////

@Component({
  selector: 'app-ordenar',
  templateUrl: './ordenar.page.html',
  styleUrls: ['./ordenar.page.scss'],
})
export class OrdenarPage implements OnInit {
  orden: any;
  fechaVenta!: Date;
  fechaCobro!: Date;
  public fechaSeleccionada: any;
  public fechaHoy!: string;
  public now!: Date;
  public minDate!: number;
  public maxDate!: string;
  public usuarioActual: any;
  public mercados: any;
  public mercado: any;
  public cereales: any;
  public monedas: any;
  public cerealResumen!: any;
  public estaTodoCargado: boolean | false = false;
  public cantidadCosechas!: number
  public urlVer : any;
  constructor(public navCtrl: NavController,
    public loadingController: LoadingController,
    public resumenService: ResumenService,
    public uiService: UiService,
    public cerealesService: CerealesService,
    public cerealResumenService: CerealResumenService,
    public ordenesVentaService: OrdenesVentaService,
    public ordenVentasMercadosService: OrdenVentasMercadosService,
    public monedasService: MonedasService,
    public navController: NavController,
    //monedasService: MonedasService,

    private router: Router
    ) {
      this.fechaHoy = new Date().toString();

      const usuarioActualStr = localStorage.getItem('usuarioActual');
      if (usuarioActualStr) {
        this.usuarioActual = JSON.parse(usuarioActualStr);
        this.orden = {}

        this.fechaVenta = new Date();
        this.fechaCobro = new Date(this.fechaVenta.getUTCFullYear(), this.fechaVenta.getUTCMonth(), this.fechaVenta.getUTCDate() + 10);


        this.now = new Date();
        this.minDate = this.now.getFullYear();
        this.maxDate = new Date(this.now.getFullYear() + 2, 11, 31).toISOString();
        this.uiService = uiService;

      }else{

        this.router.navigateByUrl("/logout");
      }

     }


     logForm(){
      if(this.orden.precioBase) {
        let confirmacion = [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {

              console.log('Alert Cancelado');
            },
          },
          {
            text: 'Aceptar',
            role: 'confirm',
            handler: () => {
              this.ordenesVentaService.crearOrden(this.orden)

                this.orden = {codigoCereal: null, mercado: null, moneda: null, precio: null, precioBase: null, toneladas: null, cosecha: null};
                this.orden.fechaVenta = "Fecha de venta: "+this.uiService.parseFecha(this.fechaVenta);
                this.orden.fechaCobro =  "Fecha de cobro: "+this.uiService.parseFecha(this.fechaCobro);


            },
          },
        ];

        this.uiService.presentAlertConfirm("Esta orden posee un precio base", 'La venta solo se realizará si el precio del mercado alcanza el precio base de $' + this.orden.precioBase + '. Está de acuerdo?', confirmacion );
      }else{

        this.ordenesVentaService.crearOrden(this.orden)
        this.orden = {codigoCereal: null, precio: null, precioBase: null, toneladas: null, cosecha: null};
        this.orden.fechaVenta = "Fecha de venta: " + this.uiService.parseFecha(this.fechaVenta);
        this.orden.fechaCobro = "Fecha de cobro: " + this.uiService.parseFecha(this.fechaCobro);

      }


     }


  async ngOnInit() {


    this.cargarMercados()
    this.cargarCereales()
    this.cargarMonedas();
     this.estaTodoCargado = true;


  }


  async buscaCosechas() {


    if(this.orden.mercado == 1) {

        this.cerealResumenService.load(this.orden.codigoCereal, false).then(async(data: any) => {

          this.cantidadCosechas = data.cerealResumenes.cantidadRegistros
          this.cerealResumen = data.cerealResumenes.cerealResumenes;

          if (this.cantidadCosechas == 0 ){
            this.uiService.presentAlertInfo("NO hay cosechas disponibles para el cereal seleccionado")

          }


         });;
    }
  }
  async  cargarMercados(){

    this.ordenVentasMercadosService.load().then(async(data) => {

     this.mercados = data;

    });
  }
  async  cargarCereales(){
    this.cerealesService.load().then(async(data) => {
     this.cereales = data;

    });
  }
  async cargarMonedas(){
    this.monedasService.load().then(async(data)=> {
      this.monedas = data;
    })
  }
  public deleteFecha() {
    debugger
    if(this.orden.mercado == "Disponible") {
      this.orden.cosecha == null;
      this.orden = {codigoCereal: null, precio: null, precioBase: null, toneladas: 0, cosecha: null, mercado: 1, moneda: null};
      this.orden.fechaVenta =  this.uiService.parseFecha(this.fechaVenta);
      this.orden.fechaCobro =  this.uiService.parseFecha(this.fechaCobro);

    } else{
      this.orden.fechaCobro = null;
      this.orden.cosecha == null;
      this.orden = {moneda: null, codigoCereal: null, precio: null, precioBase: null, toneladas: null, cosecha: null, mercado: 2};
      this.orden.fechaVenta =  this.uiService.parseFecha(this.fechaVenta);

    }
  }



  public asignarFecha() {
    let fechaParseadaTemp = this.fechaSeleccionada.split("T")
    let fechaParseada= fechaParseadaTemp[0]
    this.orden.fechaCobro = fechaParseada;

    console.log(this.orden.fechaCobro);
  }


  public checkDisable() {
    if(this.orden.codigoCereal && this.orden.moneda && this.orden.mercado
      && this.orden.toneladas && this.orden.fechaVenta && this.orden.fechaCobro
      && this.orden.cosecha && (this.orden.precioBase > 0) && this.orden.toneladas > 0
      && (this.orden.mercado || this.validarCosecha())) {
        return false;
      }
    return true;
  }



  validarCosecha() {
    const cosechaString = this.orden.cosecha.toString();
    if(this.orden.mercado && this.orden.mercado == 2 && this.orden.cosecha && cosechaString.length == 4 && Number(cosechaString.substr(0, 2)) >= Number((new Date().getUTCFullYear() - 1).toString().substr(2,2)) && Number(cosechaString.substr(0, 2)) + 1 == Number(cosechaString.substr(2, 2))) {
      return true;
    } else {
      return false;
    }
  }

}

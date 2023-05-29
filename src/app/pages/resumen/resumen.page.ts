import { Component, OnInit, inject } from '@angular/core';
import { ResumenService } from 'src/app/services/resumen.service';
import { ActivatedRoute } from '@angular/router';
import { Funciones } from 'src/app/modelo/funciones';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { UiService } from 'src/app/services/ui.service';
@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit {
  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public mostrarDetalleCuentas = false;
  public mostrarDetalleFichaRemitos = false;
  public mostrarDetalleFichaCombustibles = false; // Usado para ocultar el detalle de las cuentas
  public mostrarDetalleCereales = false;          // Usado para ocultar el detalle de los cereales
  public seccion !: string;
  public contieneRemitos: boolean | any;
  public contieneCombustibles: boolean | any;

  istodoCargado = false;
  data: any;
  resumen: any;
  funciones: Funciones = new Funciones([""]);
  private activatedRoute = inject(ActivatedRoute);
  constructor(public resumenService: ResumenService,
    private uiService: UiService,
    private navController: NavController,
    private loadingController: LoadingController,
    private menuController: MenuController) {
  }

  async ngOnInit() {

    await this.uiService.presentLoading();
    this.seccion = this.activatedRoute.snapshot.paramMap.get('id') as string;

    if (this.seccion) {

      this.resumenService.load().then(
        async resp => {
          this.data = resp;
          this.resumen = this.data.resumen;
          this.funciones = new Funciones(this.data.funciones.listaFunciones);
          this.istodoCargado = true;
          this.cargarDatos();
          await this.loadingController.dismiss();
        });
    } else {
      await this.loadingController.dismiss();
      
      this.navController.navigateRoot('', { animated: true });
    }
  }


  /**
    * Esta funcion se usa para cargar los datos restantes
    */
  public cargarDatos() {
    this.tieneCombustibles();
    this.tieneRemitos();
  }


  /**
    * Este metodo se ejecuta cuando se selecciona una cuenta
    */
  public ctacteTapped(event: any, item: any) {
    if (this.tieneFuncion("detalleCtaCte")) {
      this.navController.navigateRoot('/detalle-ctacte',
        {
          animated: true,
          queryParams: { cuenta: item }
        });
    }
  }


  /**
    * Este metodo se ejecuta cuando se selecciona un cereal
    */
  public cerealTapped(event: any, item: any) {
    if (this.tieneFuncion("detalleCereal")) {
      this.navController.navigateRoot('/detalle-cereal',
        {
          animated: true,
          queryParams: { cereal: item }
        });
    }
  }


  /**
  * Este metodo se utiliza para mostrar/ocultar el detalle de cereales
  */
  public toggleDetalleCereales() {
    this.mostrarDetalleCereales = !this.mostrarDetalleCereales;
  }


  /**
    * Este metodo se utiliza para mostrar/ocultar el detalle de las cta. cte.
    */
  public toggleDetalleCuentas() {
    this.mostrarDetalleCuentas = !this.mostrarDetalleCuentas;
  }


  /**
  * Este metodo devuelve el path al logo de la empresa
  */


  public getFechaActualizacion(): string {
    return this.resumen.fechaActualizacion;
  }

  public tieneFuncion(funcion: string): boolean {
    if (!this.funciones)
      return false;

    return this.funciones.tieneFuncion(funcion);
  }
  public tieneRemitos() {
    let element = this.resumen.fichaRemito;
    for (var i = 0, len = element.length; i < len; i++)
      if (element[i].idRubroCtacte.idRubroCtacte == 1 || element[i].idRubroCtacte.idRubroCtacte == 2) {
        this.contieneRemitos = true;
        break;
      } else {
        this.contieneRemitos = false;
      }
  }

  public tieneCombustibles() {
    let element = this.resumen.fichaRemito;
    for (var i = 0, len = element.length; i < len; i++)
      if (element[i].idRubroCtacte.idRubroCtacte == 3) {
        this.contieneCombustibles = true;
        break;
      } else {
        this.contieneCombustibles = false;
      }
  }

  public ctacteActualTapped(event: any, item: any) {
    if (this.tieneFuncion("detalleCtaCte")) {
      //this.navCtrl.push(DetalleCtaCtePage, { item: item });
    }
  }

  public getLogoEmpresa() {
    return "http://www.gestagro.com.ar/clientes/movil/logos/11.png";
  }

}

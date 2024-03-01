import { Mensajes } from 'src/app/modelo/mensajes';
import { MiCuentaPage } from './../mi-cuenta/mi-cuenta.page';
import { Component, OnInit, inject } from '@angular/core';
import { ResumenService } from 'src/app/services/resumen.service';
import { ActivatedRoute } from '@angular/router';
import { Funciones } from 'src/app/modelo/funciones';

import {
  LoadingController,
  MenuController,
  NavController,
} from '@ionic/angular';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { UiService } from 'src/app/services/ui.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { Configuraciones } from 'src/configuraciones/configuraciones';
import { MercadosService } from 'src/app/services/mercados-service';
import { Subscription, interval, timer } from 'rxjs';

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
  public mostrarDetalleCereales = false;
  public mostrarMercadoDisponible = false; // Usado para ocultar el detalle disponible
  public mostrarMercadoFuturo = false;
  public mostrarMercadoPizarra = false;
  public mostrarNoticias = false;
  public seccion!: string;
  public contieneRemitos: boolean | any;
  public contieneCombustibles: boolean | any;
  public contieneMercadoCereales: boolean | any;
  public saldoDeudorAcreedor: any | undefined;
  public importeEstadoSaldos: any | undefined;
  public fechaCierre: string | undefined;
  mensajes: Mensajes[] = JSON.parse(localStorage.getItem('mensajes') || '[]');
  public mensajeEnviadoSn: string | undefined;
  private apiCallSubscription: Subscription = new Subscription();

  data: any;
  resumen: any;
  empresa: any;
  logo: any;
  funciones: Funciones = new Funciones(['']);
  funcionesCliente: any;
  private activatedRoute = inject(ActivatedRoute);
  istodoCargado: any;
  isMercadoDisponible: any;
  isMercadoFuturo: any;
  isMercadoPizarra: any;
  isPizarra: any;
  // verificar permisos
  isNoticias: any;
  isOrdenesVentaCereal: any;
  isPedidosDeFondos: any;

  public notificaciones: any;
  public ver: boolean = false;
  public numeroMensajes: any;
  public mercadoDisponible: any;
  public mercadoPizarra: any;
  public mercadoFuturo: any;
  public noticias: any;
  public intervalId: any;

  constructor(
    public resumenService: ResumenService,
    private uiService: UiService,
    private navController: NavController,
    private loadingController: LoadingController,
    private menuController: MenuController,
    public notificacionesService: NotificacionesService,
    public mercadoDisponibleService: MercadosService,
    public mercadoFuturosService: MercadosService,
    public mercadosPizarraService: MercadosService,

    private menuCtrl: MenuController
  ) {}

  async ngOnInit() {
    // refresco la pagina por el cache
    this.menuCtrl.enable(true);
    this.istodoCargado = false;
    this.isMercadoDisponible = false;
    this.isMercadoFuturo = false;
    this.isPizarra = false;
    this.isMercadoPizarra = false;
    this.mensajeEnviadoSn = 'N';
    this.isNoticias = false;

    this.controlCarga();
    await this.uiService.presentLoading('Aguarde...');

    this.seccion = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.resumenService.load().then(async (resp) => {
      this.data = resp;

      this.resumen = this.data.resumen;
      this.empresa = this.data.resumen.empresa;
      this.istodoCargado = true;
      this.funciones = new Funciones(this.data.funciones.listaFunciones);
      this.funcionesCliente = this.data.funciones.listaFunciones;

      this.cargarDatos();
      await this.loadingController.dismiss();
      clearInterval(this.intervalId);
    });
    this.notificacionesService.ponerEnFalso();
    this.notificacionesService.checkPorVer().then(async (resp) => {
      this.data = resp;
      if (this.data > 0) {
        this.ver = true;
      } else {
        this.ver = false;
      }
      this.numeroMensajes = this.data;
    });
  }
  controlCarga() {
    let count = 0;
    // Si tiro algún que ingreso al catch, hago un intervalo de 10 segundos,

    this.intervalId = setInterval(() => {
      count++;
      if (count == 10) {
        clearInterval(this.intervalId);
        this.loadingController.dismiss();

        window.location.reload();
      }
      console.log('ControlCarga() esperando --> ' + count);
    }, 1000);
  }
  // End ngOnInit()

  public getLogoEmpresa() {
    if (this.resumen.empresa.id != '') {
      this.logo = Configuraciones.rutaLogos + this.resumen.empresa.id + '.png';
      return this.logo;
    } else {
      return Configuraciones.rutaLogos + '00.png';
    }
  }
  /**
   * Esta funcion se usa para cargar los datos restantes
   */
  public graboMensajes(id: any, msg: any) {
    const nuevoMensaje: Mensajes = { id: id, contenido: msg };
    this.mensajes.push(nuevoMensaje);
    localStorage.setItem('mensajes', JSON.stringify(this.mensajes));
  }

  deleteStorage() {
    localStorage.removeItem('mensajes');
  }

  public verificaMensajeEnviado(mensaje: any) {
    const mensajesAlmacenados: Mensajes[] = JSON.parse(
      localStorage.getItem('mensajes') || '[]'
    );

    for (var i = 0, len = mensajesAlmacenados.length; i < len; i++) {
      if (mensaje == mensajesAlmacenados[i].contenido) {
        this.mensajeEnviadoSn = 'S';
      } else {
        this.mensajeEnviadoSn = 'N';
      }
    }
  }
  public verificaSiHayNuevasNotificaciones() {
    // traigo las notificaciones

    this.notificacionesService.ponerEnFalso();
    this.notificacionesService.checkPorVer().then(async (resp) => {
      this.data = resp;

      if (this.data > 0) {
        this.ver = true;
      } else {
        this.ver = false;
      }

      if (this.data > this.numeroMensajes) {
        let modalNotificaciones: HTMLElement = document.getElementById(
          'open-custom-dialog'
        ) as HTMLElement;
        modalNotificaciones.click();
      }
      this.numeroMensajes = this.data;
    });
  }
  ngOnDestroy(): void {
    // Cuando el componente se destruye, desuscribirse
    // alert("destruyo observable en modulo resumen !! MODULO PRINCIPAL")
    this.apiCallSubscription.unsubscribe();
  }
  public cargarDatos() {
    // traigo las notificaciones
    this.notificacionesService.load().then((notificaciones) => {
      this.notificaciones = notificaciones;
      if (this.notificaciones.length > this.numeroMensajes) {
        let modalNotificaciones: HTMLElement = document.getElementById(
          'open-custom-dialog'
        ) as HTMLElement;
        modalNotificaciones.click();
      }
    });

    /// observable que se ejecuta cada cierto tiempo para verificar si hay nuevas notificaciones

    this.apiCallSubscription = interval(
      Configuraciones.intervaloDeAutoActualizacion
    ).subscribe(() => {
      this.verificaSiHayNuevasNotificaciones();
    });

    // traigo el mercado de cereales
    // await this.uiService.presentLoading("Cargando mercados...");
    this.mercadoDisponibleService
      .load(
        this.resumen.empresa.id,
        'json',
        'mercado-cereales',
        '1',
        this.resumen.empresa.coopeHash
      )
      .then((data: any) => {
        if (data.control == 1) {
          this.mercadoDisponible = data.mercadoCer;

          this.fechaCierre = this.mercadoDisponible[0].cierre;
          if (this.mercadoDisponible == '' || this.mercadoDisponible == null) {
            this.isMercadoDisponible = false;
          } else {
            this.isMercadoDisponible = true;
          }
        } else {
          this.isMercadoDisponible = false;

        }
      });
    this.mercadoFuturosService
      .load(this.resumen.empresa.id, 'json', 'mercado-cereales', '2')
      .then(async (data: any) => {
        if (data.control == 1) {
        this.mercadoFuturo = data.mercadoCer;
        if (this.mercadoFuturo.length > 0) {
          this.isMercadoFuturo = true;
        } else {
          this.isMercadoFuturo = false;
        }
      }else{
        this.isMercadoFuturo = false;

      }
      });

    this.mercadosPizarraService
      .load(
        this.resumen.empresa.id,
        'json',
        'mercado-cereales',
        '3',
        this.resumen.empresa.coopeHash
      )
      .then((data: any) => {
        if (data.control == 1) {
          this.mercadoPizarra = data.mercadoCer;
          this.fechaCierre = this.mercadoPizarra[0].cierre
            ? this.mercadoPizarra[0].cierre
            : new Date();
          // let result = condition ? value1 : value2;
          if (this.mercadoPizarra == '' || this.mercadoPizarra == null) {
            this.isMercadoPizarra = false;
          } else {
            this.isMercadoPizarra = true;
          }
        } else {
          this.isMercadoPizarra = false;
        }
      });

    this.tieneCombustibles();
    this.tieneRemitos();
    this.tieneMercadoCereales();
    this.tienePizarra();
    this.tieneNoticias();
    this.tieneOrdenesVenta();
    this.tienePedidosDeFondos();
  }

  ngAfterViewInit() {
    //return 'ngAfterViewInit()';
    //let headerImporteCtacteResaltadoPositivo = '';
  }
  /**
   * Este metodo se ejecuta cuando se selecciona una cuenta
   */
  public ctacteTapped(event: any, item: any) {
    if (this.tieneFuncion('detalleCtaCte')) {
      this.navController.navigateRoot('/detalle-ctacte', {
        animated: true,
        queryParams: { cuenta: item, socio: this.resumen.cuenta },
      });
    }
  }
  public ofertasProductosTapped(event: any, item: any) {
    if (this.tieneFuncion('catalogoDeProductos')) {
      this.navController.navigateRoot('/ofertas', {
        animated: true,
        queryParams: { cuenta: item, socio: this.resumen.cuenta },
      });
    }
  }
  // solo para caur
  public ofertasCaurTapped() {
    if (this.tieneFuncion('ofertasCaur')) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Este metodo se ejecuta cuando se selecciona un cereal
   */
  public cerealTapped(event: any, item: any) {
    if (this.tieneFuncion('detalleCereal')) {
      this.navController.navigateRoot('/detalle-cereal', {
        animated: true,
        queryParams: { cereal: item },
      });
    }
  }

  /**
   * Este metodo se utiliza para mostrar/ocultar el detalle de cereales
   */
  public toggleDetalleCereales() {
    this.mostrarDetalleCereales = !this.mostrarDetalleCereales;
  }
  public toggleMercadoDisponible() {
    this.mostrarMercadoDisponible = !this.mostrarMercadoDisponible;
    //alert("ciick mercado disponible "+this.mostrarMercadoDisponible)
  }
  public toggleNoticias() {
    this.mostrarNoticias = !this.mostrarNoticias;
  }
  public toggleMercadoFuturo() {
    this.mostrarMercadoFuturo = !this.mostrarMercadoFuturo;
  }
  public toggleMercadoPizarra() {
    this.mostrarMercadoPizarra = !this.mostrarMercadoPizarra;
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
    if (!this.funciones) return false;

    return this.funciones.tieneFuncion(funcion);
  }
  public tieneRemitos() {
    let element = this.resumen.fichaRemito;
    for (var i = 0, len = element.length; i < len; i++)
      if (
        element[i].idRubroCtacte.idRubroCtacte == 1 ||
        element[i].idRubroCtacte.idRubroCtacte == 2
      ) {
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

  public tieneMercadoCereales() {
    /*let element = this.resumen.fichaRemito;
    for (var i = 0, len = element.length; i < len; i++)
      if (element[i].idRubroCtacte.idRubroCtacte == 3) {
        this.contieneMercadoCereales = true;
        break;
      } else {
        this.contieneMercadoCereales = false;
      }*/
  }
  public tienePizarra() {
    /*let element = this.resumen.fichaRemito;
    for (var i = 0, len = element.length; i < len; i++)
      if (element[i].idRubroCtacte.idRubroCtacte == 3) {
        this.contieneMercadoCereales = true;
        break;
      } else {
        this.contieneMercadoCereales = false;
      }*/
  }
  public tieneNoticias() {
    let element = this.funcionesCliente;

    for (var i = 0, len = element.length; i < len; i++) {
      if (this.funcionesCliente[i] == 'noticias') {
        this.isNoticias = true;
      }
    }
  }

  public irANotificaciones() {
    let dismm: HTMLElement = document.getElementById('bot') as HTMLElement;
    dismm.click();
    this.navController.navigateRoot('/notificaciones');
  }
  public irAPedidoDeDinero() {
    this.navController.navigateRoot('/pedidos-de-dinero/pedir-dinero');
  }
  public irAOrdenesDeVenta() {
    this.navController.navigateRoot('/ordenes-de-venta/ordenar');
  }

  public tieneOrdenesVenta() {
    let element = this.funcionesCliente;

    for (var i = 0, len = element.length; i < len; i++) {
      if (this.funcionesCliente[i] == 'ordenesDeVentaDeCereal') {
        this.isOrdenesVentaCereal = true;
      }
    }
  }
  public tienePedidosDeFondos() {
    let element = this.funcionesCliente;

    for (var i = 0, len = element.length; i < len; i++) {
      if (this.funcionesCliente[i] == 'pedidoDeFondos') {
        this.isPedidosDeFondos = true;
      }
    }
  }

  public ctacteActualTapped(event: any, item: any) {
    if (this.tieneFuncion('detalleCtaCte')) {
      //this.navCtrl.push(DetalleCtaCtePage, { item: item });
    }
  }

  public linkMiCuenta() {
    this.navController.navigateRoot('/mi-cuenta');
  }
  public linkMovCtaCte() {
    this.navController.navigateRoot('/detalle-ctacte');
  }
  public getSaldoCtaCteActual(saldo: any) {
    if (saldo < 0) {
      // acreedor
      setTimeout(() => {
        this.saldoDeudorAcreedor = 'ACREEDOR';
        this.importeEstadoSaldos = 'headerImporteCtacteResaltadoNegativo';
      }, 1000);
    } else {
      setTimeout(() => {
        // deudor
        this.saldoDeudorAcreedor = 'DEUDOR';
        this.importeEstadoSaldos = 'headerImporteCtacteResaltadoPositivo';
      }, 1000);
    }
    return saldo;
  }

  public isMercadoCerealesCargado(): boolean {
    // Pregunto si ya se obtuvo una respuesta del serivicio
    if (this.isMercadoDisponible == true) {
      return true;
    } else {
      return false;
    }
  }

  /*
notififaciones push


*/
}

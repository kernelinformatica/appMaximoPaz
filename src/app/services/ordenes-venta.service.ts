import { Injectable } from '@angular/core';

//------------IMPORTO LAS CLASES QUE NECESITO ------------//
//Agrego las configuraciones
import { Configuraciones } from '../../configuraciones/configuraciones';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadChildren, Route, Router } from '@angular/router';
import { OrdenVenta } from '../modelo/ordenes-venta/ordenVenta';
import { UiService } from './ui.service';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class OrdenesVentaService {
  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.ordenesVentaUrl;
  public orden!: OrdenVenta;
  public ordenesVentaPendientes: OrdenVenta[] = [];
  public ordenesVentaTerminadas: OrdenVenta[] = [];
  public flag: boolean = false;
  public usuarioActual: any;
  public respuesta!: string;

  constructor(
    public http: HttpClient,
    public uiService: UiService,
    public loadingController: LoadingController,
    public router: Router
  ) {}
  public async load() {

    const usuarioActualStr = localStorage.getItem('usuarioActual');
    if (usuarioActualStr) {
      this.usuarioActual = JSON.parse(usuarioActualStr);
    }

    return new Promise(async (resolve, reject) => {
      try {
        const url = `${this.getURLServicio()}`;
        const params = {};
        const httpOptions = {
          headers: new HttpHeaders({
            token: this.usuarioActual.token.hashId,
          }),
        };
        this.ordenesVentaPendientes = [];
        this.ordenesVentaTerminadas = [];

        this.http.get(url, httpOptions).subscribe((response: any) => {
          let control = response.control;
          if (control.codigo == 'OK') {
            if (response.datos.ordenes.length > 0) {
              response.datos.ordenes.sort((a: any, b: any) =>
                new Date(a.fechaActualizado) <= new Date(b.fechaActualizado)
                  ? 1
                  : -1
              );
              response.datos.ordenes.forEach((element: OrdenVenta) => {
                if (
                  element.idEstado.idEstado == 1 ||
                  element.idEstado.idEstado == 2 ||
                  element.idEstado.idEstado == 3
                ) {
                  this.ordenesVentaPendientes.push(element);
                } else {
                  this.ordenesVentaTerminadas.push(element);
                }
              });
            } else {
            }
            //Meter un new Date en un metodo mata la performance, llegado el caso debe crearse
            //correctamente el array, haciendo uso de push y generando cada orden por separado
            //y dentro del constructor, generar las dates en vez de asignarlas
            //this.ordenesVenta.sort((a, b) => new Date(a.fechaActualizado) <= new Date(b.fechaActualizado) ? 1 : -1)
            this.flag = true;

            resolve({
              ordenesDeVenta: this.ordenesVentaPendientes,
            });
          }
        });
      } catch (error: any) {
        const dataError = JSON.parse(error.error);
        reject(dataError.control.descripcion);
      }
    });
  }

  public async loadHistorial() {
    const usuarioActualStr = localStorage.getItem('usuarioActual');
    if (usuarioActualStr) {
      this.usuarioActual = JSON.parse(usuarioActualStr);
    }
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${this.getURLServicio()}`;
        const params = {};
        const httpOptions = {
          headers: new HttpHeaders({
            token: this.usuarioActual.token.hashId,
          }),
        };
        this.ordenesVentaPendientes = [];
        this.ordenesVentaTerminadas = [];
        this.http.get(url, httpOptions).subscribe((response: any) => {
          let control = response.control;
          if (control.codigo == 'OK') {
            if (response.datos.ordenes.length > 0) {
              response.datos.ordenes.sort((a: any, b: any) =>
                new Date(a.fechaActualizado) <= new Date(b.fechaActualizado)
                  ? 1
                  : -1
              );
              response.datos.ordenes.forEach((element: OrdenVenta) => {
                if (
                  element.idEstado.idEstado === 1 ||
                  element.idEstado.idEstado === 2 ||
                  element.idEstado.idEstado === 3
                ) {
                } else {
                  this.ordenesVentaTerminadas.push(element);
                }
              });
            } else {
            }
            //Meter un new Date en un metodo mata la performance, llegado el caso debe crearse
            //correctamente el array, haciendo uso de push y generando cada orden por separado
            //y dentro del constructor, generar las dates en vez de asignarlas
            //this.ordenesVenta.sort((a, b) => new Date(a.fechaActualizado) <= new Date(b.fechaActualizado) ? 1 : -1)
            this.flag = true;

            resolve({
              ordenesDeVenta: this.ordenesVentaTerminadas,
            });
          }
        });
      } catch (error: any) {
        const dataError = JSON.parse(error.error);
        reject(dataError.control.descripcion);
      }
    });
  }

  public crearOrden(aOrdenar: any) {
    ;
    const usuarioActualStr = localStorage.getItem('usuarioActual');
    if (usuarioActualStr) {
      this.usuarioActual = JSON.parse(usuarioActualStr);
    }
    // tenog que cambiar el id de mercado porque para coopaz disponible es  = 5 y foward = 6
    if (aOrdenar.mercado == 1) {
      aOrdenar.mercado = 5;
    } else if (aOrdenar.mercado == 2) {
      aOrdenar.mercado = 6;
    }
    ///Inicializo los parametros de GET
    let parameters:URLSearchParams = new URLSearchParams();
    parameters.set("codigoCereal", aOrdenar.codigoCereal);
    parameters.set("cosecha",  aOrdenar.mercado == 5 ? aOrdenar.cosecha.substr(0, 2) + aOrdenar.cosecha.substr(3, 2): aOrdenar.cosecha.toString());
    parameters.set("precioBase",aOrdenar.precioBase);
    parameters.set("toneladas", aOrdenar.toneladas);
    parameters.set("idMoneda", aOrdenar.moneda);
    parameters.set("idMercado", aOrdenar.mercado);
    parameters.set("observaciones", '.');
    parameters.set("fechaCobro", aOrdenar.mercado == 6 ? aOrdenar.fechaCobro : '2023-10-11');
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${this.getURLServicio()}` + '/ordenar';

        const params = {};
        const httpOptions = {
          headers: new HttpHeaders({
            token: this.usuarioActual.token.hashId,
            codigoCereal: aOrdenar.codigoCereal,
            cosecha:
              aOrdenar.mercado == 5
                ? aOrdenar.cosecha.substr(0, 2) + aOrdenar.cosecha.substr(3, 2)
                : aOrdenar.cosecha.toString(),
            precioBase: aOrdenar.precioBase,
            toneladas: aOrdenar.toneladas * 1000,
            idMoneda: aOrdenar.moneda,
            idMercado: aOrdenar.mercado,
            observaciones: '.',
            fechaCobro:
              aOrdenar.mercado == 6 ? aOrdenar.fechaCobro : '',
          }),
        };

        //.toLocaleDateString('en-GB', { timeZone: "UTC" })
        this.ordenesVentaPendientes = [];
        this.ordenesVentaTerminadas = [];
      this.http.post(url, params, httpOptions).subscribe({
          next: (response: any) => {
            // data is already a JSON object

           // data is already a JSON object
          let control = response.control;
          if (control.codigo == 'OK') {
            let control: any = response.control;
            console.log(control, control.codigo);
            if (control.codigo == 'OK') {
              this.uiService.presentAlertInfo(
                'Orden almacenada, Aguarde a que un operador de la ' +
                  Configuraciones.razonSocialNombreCorto +
                  ' apruebe su orden de venta.'
              );
            }
          } else {
            this.uiService.presentAlertInfo(
              'Orden fallida, Su orden no pudo ser procesada, inténtelo más tarde.'
            );
          }
        },
          error: (error: any) => {
            this.uiService.presentAlertInfo(
              'Orden fallida, Su orden no pudo ser procesada, inténtelo más tarde. '+error.error
            );
            // ourrio algun error en el login
            resolve(error);
          },
        });


      } catch (error: any) {
        const dataError = JSON.parse(error.error);
        reject(dataError.control.descripcion);
      }
    });
  }

  public irAmisOrdenes() {
    this.router.navigateByUrl('/ordenes-de-venta/mis-ordenes');
  }
  /**
   * Esta funcion devuelve la URL del servicio
   */
  private getURLServicio() {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return OrdenesVentaService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`;
  }
}

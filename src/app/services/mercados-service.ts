import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

//------------IMPORTO LAS CLASES QUE NECESITO ------------//
import { Configuraciones } from 'src/configuraciones/configuraciones'
import { DetalleCtaCte } from '../modelo/detallectacte';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MercadoDisponible } from '../modelo/mercado-cereales/mercado-disponible';
import { MercadoFuturos } from '../modelo/mercado-cereales/mercado-futuros';
import { ProductosDisponible } from '../modelo/mercado-cereales/productos-disponible';
import { ProductosFuturos } from '../modelo/mercado-cereales/productos-futuros';
import { DetalleCtaCteService } from './detallectacte.service';


/**
* Esta clase se creo para invocar el recurso del servicio web que devuelve el
* detalle de una cuenta corriente
*/
@Injectable({
    providedIn: 'root'
  })
  export class MercadosService {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.serviciosWebURL;
  public mercadoDisponible : MercadoDisponible | undefined;
  public mercadoFuturos : MercadoFuturos | undefined;
  public productosDisponible: ProductosDisponible | undefined;
  public productosFuturos: ProductosFuturos | undefined;
  public flag : boolean = false;
  //---------------------------------------------//

  usuarioActual: any;
  mercadoCerealesResp: any;
  mercadoCereales: any;

  control: any;
  // Metodo constructor
  constructor(public http: HttpClient) { }

  // Este metodo invoca el servicio y parsea la respuesta
  public async load(coope? : string, formato?: string, action?: string, type?: string, hash?: string) {
    
    const usuarioActualStr = localStorage.getItem('usuarioActual');
    if (usuarioActualStr) {
      this.usuarioActual = JSON.parse(usuarioActualStr);
    }

    return new Promise(async (resolve, reject) => {


        //Armo las opciones del request.
        let coopeParm:string = coope?coope:'00';
        let formatoParm:string = formato?formato:'json';
        let actionParm:string = action?action:'mercado-cereales';
        let typeParm:string = type?type:'1';
        let hashId: string = hash?hash:'0';
          //Inicializo los parametros de GET
        let parametros:URLSearchParams = new URLSearchParams();
        parametros.set("coope", coopeParm);
        parametros.set("format", formatoParm);
        parametros.set("action", actionParm);
        parametros.set("hashId", hashId); 
        parametros.set("type", typeParm);




        try {

        const url = `${this.getURLServicio()}?`+parametros;
        const params = {parametros };
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',

          }),
        };

        this.http.get(url,  httpOptions).subscribe((resp : any)   => {

          // data is already a JSON object


        if (resp.data != "0"){

          var data = resp;
          this.mercadoCerealesResp = data.data;
          let controlCodigo = data.code;
          let controlStatus = data.status;
          let controlDetalle = data.detail;
          if (controlStatus == 200){
            resolve(
              {
                control : controlCodigo,
                mercadoCer: this.mercadoCerealesResp,
                funciones: this.usuarioActual.funciones
              });

            }else{
              resolve(
                {
                  control : controlCodigo,
                  mercadoCer: this.mercadoCerealesResp,
                  funciones: this.usuarioActual.funciones
                });
          }

        }else{

        }

      });
        } catch (error: any) {
          const dataError = JSON.parse(error.error)
          reject(dataError.control.descripcion);
        }
      });

  }

  /**
  * Esta funcion devuelve la URL del servicio
  */
  private getURLServicio() {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return MercadosService.URLSERVICIO;
  }
}

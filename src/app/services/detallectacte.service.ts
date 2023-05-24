import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

//------------IMPORTO LAS CLASES QUE NECESITO ------------//
import { Configuraciones } from 'src/configuraciones/configuraciones'
import { DetalleCtaCte } from '../modelo/detallectacte';


/**
* Esta clase se creo para invocar el recurso del servicio web que devuelve el
* detalle de una cuenta corriente
*/
@Injectable({
    providedIn: 'root'
  })
  export class DetalleCtaCteService {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.detalleCtaCteUrl;
  public detalleCtaCte: DetalleCtaCte | any;
  //---------------------------------------------//

  usuarioActual: any;

  // Metodo constructor
  constructor(public http: HTTP) { }

  // Este metodo invoca el servicio y parsea la respuesta
  public async load() {

    const usuarioActualStr = localStorage.getItem('usuarioActual');
    if (usuarioActualStr) {
      this.usuarioActual = JSON.parse(usuarioActualStr);
    }

    return new Promise(async (resolve, reject) => {
        try {
          const url = `${this.getURLServicio()}`;
          const params = { };
          const headers = { token: '' + this.usuarioActual.token.hashId };
          const response = await this.http.get(url, params, headers);
          const data = JSON.parse(response.data);
  
          if (data.control.codigo == "OK") {
            this.detalleCtaCte = new DetalleCtaCte(data.datos);
            resolve(
              { 
                detalleCtaCte: this.detalleCtaCte,
              });
          }
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
    return DetalleCtaCteService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`;
  }
}

import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

//------------IMPORTO LAS CLASES QUE NECESITO ------------//
import { Configuraciones } from 'src/configuraciones/configuraciones'
import { DetalleCtaCte } from '../modelo/detallectacte';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
  detalleCtateSocio: any;
  // Metodo constructor
  constructor(public http: HttpClient) { }

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
        const httpOptions = {
          headers: new HttpHeaders({
            token: this.usuarioActual.token.hashId,

          }),
        };

        this.http.get(url,  httpOptions).subscribe((data : any)   => {
          // data is already a JSON object
          this.detalleCtateSocio = data;
          let control = this.detalleCtateSocio.control;

          if (control.codigo == "OK"){
            this.detalleCtaCte = new DetalleCtaCte(this.detalleCtateSocio.datos);
            resolve(
              {
                detalleCtaCte: this.detalleCtaCte,
                funciones: this.usuarioActual.funciones
              });
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
    return DetalleCtaCteService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`;
  }
}

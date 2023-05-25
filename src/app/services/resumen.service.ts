import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

//------------IMPORTO LAS CLASES QUE NECESITO ------------//
import { Configuraciones } from 'src/configuraciones/configuraciones'
import { Resumen } from 'src/app/modelo/resumen';


/**
* Esta clase se creo para invocar el recurso del servicio web que devuelve el
* resumen de la cuenta
*/
@Injectable({
  providedIn: 'root'
})
export class ResumenService {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.resumenUrl;
  public resumen: Resumen | any;
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
          this.resumen = new Resumen(data.datos);
          resolve(
            { 
              resumen: this.resumen,
              funciones: this.usuarioActual.funciones
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
    return ResumenService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`;
  }

}

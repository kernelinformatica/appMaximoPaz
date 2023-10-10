
import { Injectable } from '@angular/core';

//------------ IMPORTO LAS LIBRERIAS QUE NECESITO ------------//


//------------IMPORTO LAS CLASES QUE NECESITO ------------//
//Agrego las configuraciones

import { TransaccionFondos } from '../modelo/pedidos-fondos/transaccion-fondos';
import { TipoTransaccion } from '../modelo/pedidos-fondos/tipo-transaccion';
import { Configuraciones } from 'src/configuraciones/configuraciones'
import { Preferences } from '@capacitor/preferences';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../modelo/token';
import * as CryptoJS from 'crypto-js';
import { Control } from '../modelo/control';


/**
* Esta clase se creo para invocar el recurso del servicio web que devuelve el
* las transacciones
*/
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class TransaccionesService {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.transaccionesUrl;
  public transacciones: TipoTransaccion[] = [];
  public flag : boolean = false;
  //---------------------------------------------//
  usuarioActual: any;
  // Metodo constructor
  constructor(public http: HttpClient) {}

  // Este metodo invoca el servicio y parsea la respuesta
  public async loadTransaccionesTipos() {
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
         let control : Control = data.control;
         let respuesta = data.datos.transacciones
         this.transacciones = respuesta;
          if (control.codigo == "OK"){
            resolve(
              {
                respuesta : this.transacciones

              });
            }


        });
      } catch (error: any) {
        const dataError = JSON.parse(error.error)
        reject(dataError.control.descripcion);
        alert(dataError.control.descripcion)
      }
    });
}





  /**
  * Esta funcion devuelve la URL del servicio
  */
  private getURLServicio() {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return TransaccionesService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`;
  }


}


import { Injectable } from '@angular/core';
//------------IMPORTO LAS CLASES QUE NECESITO ------------//
//Agrego las configuraciones
import { CbuPadron } from '../modelo/cbuPadron';
import { Preferences } from '@capacitor/preferences';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../modelo/token';
import * as CryptoJS from 'crypto-js';
import { Configuraciones } from 'src/configuraciones/configuraciones'
import { Control } from '../modelo/control';
/* Esta clase se creo para invocar el recurso del servicio web que devuelve el
* las noticias de  la pagina web
*/
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class CbuPadronService {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.cbuPadronUrl;
  public arrayCbu: CbuPadron[] = [];
  public flag : boolean = false;
  //---------------------------------------------//
  usuarioActual : any;

  // Metodo constructor
  constructor(public http: HttpClient) {}

  // Este metodo invoca el servicio y parsea la respuesta
  public async loadCbus() {

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
         /* this.resumenSocio = data;*/
         let control : Control = data.control;
         let respuesta = data.datos.arrayCbu
         this.arrayCbu = respuesta;

          if (control.codigo == "OK"){

            resolve(
              {
                resp : true

              });
         }
       });


      } catch (error: any) {

        const dataError = JSON.parse(error.error)
        alert(dataError.control.descripcion)
        reject(dataError.control.descripcion);

      }
    });

  }






  /**
  * Esta funcion devuelve la URL del servicio
  */
  private getURLServicio() {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return CbuPadronService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`;
  }


}

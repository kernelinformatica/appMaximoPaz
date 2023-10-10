
import { Injectable } from '@angular/core';

//------------ IMPORTO LAS LIBRERIAS QUE NECESITO ------------//

//------------IMPORTO LAS CLASES QUE NECESITO ------------//
//Agrego las configuraciones
import { Configuraciones } from 'src/configuraciones/configuraciones'
import { Banco } from '../modelo/banco';
import { Chequera } from '../modelo/chequera';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Control } from '../modelo/control';

/**
* Esta clase se creo para invocar el recurso del servicio web que devuelve el
* las noticias de  la pagina web
*/
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ChequerasService {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.chequerasUrl;
  public chequeras: Chequera[] = [];
  public flag : boolean = false;
  //---------------------------------------------//
  usuarioActual: any;
  // Metodo constructor
  constructor(public http: HttpClient) {}

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
         /* this.resumenSocio = data;*/
         let control : Control = data.control;

         let respuesta = data.datos.chequeras
         this.chequeras = respuesta;

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
    return ChequerasService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`;
  }


}

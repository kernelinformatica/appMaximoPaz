
import { Injectable } from '@angular/core';

//------------ IMPORTO LAS LIBRERIAS QUE NECESITO ------------//


import 'rxjs/add/operator/map';
//------------IMPORTO LAS CLASES QUE NECESITO ------------//
import { Banco } from '../modelo/banco';

//Agrego las configuraciones
import { Configuraciones } from 'src/configuraciones/configuraciones'
import { Preferences } from '@capacitor/preferences';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../modelo/token';
import * as CryptoJS from 'crypto-js';


/**
* Esta clase se creo para invocar el recurso del servicio web que devuelve el
* las noticias de  la pagina web
*/
@Injectable()
export class BancosService {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.bancosUrl;
  public bancos: Banco[] = [];
  public flag : boolean = false;
  usuarioActual: any;
  //---------------------------------------------//

  // Metodo constructor
  constructor(public http: HttpClient) {}

  // Este metodo invoca el servicio y parsea la respuesta
  public load() {
    const usuarioActualStr = localStorage.getItem('usuarioActual');
    if (usuarioActualStr) {
      this.usuarioActual = JSON.parse(usuarioActualStr);
    }
    /*this.authService = AuthService.getInstance();
    if(this.authService.usuarioActual) {
      //Armo las opciones del request.
      let basicOptions:RequestOptionsArgs = {
          url: this.getURLServicio(),
          method: RequestMethod.Get,
          search: null,
          headers: new Headers({token:''+this.authService.usuarioActual.token.hashId}),
          body: null
      };
      var reqOptions = new RequestOptions(basicOptions);
      var req = new Request(reqOptions);

      return this.http.request(req).map(res => { return res.json()}).subscribe(response => {
          let control : any = response.control;
          if(control.codigo == "OK"){
            console.log(response.datos);
            this.bancos = response.datos.bancos;
            this.flag = true;
          }
      });
    }*/
}






  /**
  * Esta funcion devuelve la URL del servicio
  */
  private getURLServicio() {

    // Por ahora devuelvo el string como esta, despues hay que usar el token
    if(this.usuarioActual) {
      return BancosService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`
    }else{
      return ""
    }
  }


}

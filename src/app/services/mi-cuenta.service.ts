
import { Usuario } from 'src/app/modelo/usuario';
import { Injectable } from '@angular/core';

//------------ IMPORTO LAS LIBRERIAS QUE NECESITO ------------//
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Cuenta } from 'src/app/modelo/cuenta';


//------------IMPORTO LAS CLASES QUE NECESITO ------------//
//Le agrego el authService. Para que use el token.
import { LoginService } from 'src/app/services/login.service';

//Agrego las configuraciones
import { Configuraciones } from 'src/configuraciones/configuraciones'
import { Preferences } from '@capacitor/preferences';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/**
* Esta clase se creo para invocar el recurso del servicio web que devuelve el
* resumen de la cuenta
*/
@Injectable({
  providedIn: 'root'
})
export class MiCuentaService {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.resumenUrl;
  public miCuenta: any;
  public flag: boolean = false;
  //private loginService: LoginService | any;
  //---------------------------------------------//

  usuarioActual: any;

  // Metodo constructor
  constructor(public http: HttpClient) { }
  public configuraciones = Configuraciones;
  // Este metodo invoca el servicio y parsea la respuesta


  public cambiarClave(cambioClave : any) {

    /*return Observable.create(observer => {

      // Genero el Header
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'token': this.usuarioActual.token.hashId });

      // Seteo los parametros
      let parametros = 'claveAnterior=' + Md5.hashStr(cambioClave.claveActual) + '&claveNueva=' + Md5.hashStr(cambioClave.claveNueva);

      // Agrego los datos al header
      let options = new RequestOptions({ headers: headers });

      // Invoco el metodo de cambio de claves
      this.http.post(this.getURLCambioClave(this.usuarioActual.cuenta.id), parametros, options).map(res => { return res.json() })
        .subscribe((respuesta) => {
          //debugger;
          let control = respuesta.control;
          if (control.codigo == "OK") {

            // Intento parsear el usuario
            this.usuarioActual.token = new Token(respuesta.datos.token);

            // Si obtuve un token
            if (this.usuarioActual.token.hashId != null) {

              // Pongo la bandera de logue en true
              this.logueado = true;

            }

            AuthService.instancia = this;
            observer.next(this.logueado);
            observer.complete();
          }


        },

        error => {
          this.handleError(error);
          observer.next(false);
          observer.complete();

        } // FIN ERROR

        ) // FIN SUSCRIBE

    }); // FIN CREATE OBSERVER*/

  } // FIN METODO


  /**
  * Esta funcion devuelve la URL del servicio
  */




  /**
  * Esta funcion devuelve la URL del servicio
  */
  private getURLServicio() {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return MiCuentaService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`;
  }

}

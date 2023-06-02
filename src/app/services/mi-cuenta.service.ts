
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
import { Token } from '../modelo/token';
import * as CryptoJS from 'crypto-js';
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
  public static URLSERVICIO: string = Configuraciones.miCuentaUrl;
  public miCuenta: any;
  public flag: boolean = false;
  public control: any;
  public logueado: boolean = false;
  public respuesta : any;
  //private loginService: LoginService | any;
  //---------------------------------------------//

  usuarioActual: any;

  // Metodo constructor
  constructor(public http: HttpClient) { }
  public configuraciones = Configuraciones;
  // Este metodo invoca el servicio y parsea la respuesta


  public async cambiarClave(claveActual: any, claveNueva : any) {

    const usuarioActualStr = localStorage.getItem('usuarioActual');

    if (usuarioActualStr) {
      this.usuarioActual = JSON.parse(usuarioActualStr);

    }

    return new Promise(async (resolve, reject) => {
        try {

        //const params = 'claveAnterior=' + CryptoJS.MD5(claveActual) + '&claveNueva=' + CryptoJS.MD5(claveNueva);;

       // Doy los valores por defecto, para que el codigo actual siga andando. Luego habría que forzar los argumentos.
        let claveAnteriorEnviar  = CryptoJS.MD5(claveActual)
        let claveNuevEnviar = CryptoJS.MD5(claveNueva);

        ///Inicializo los parametros de GET
        let parameters:URLSearchParams = new URLSearchParams();
        parameters.set("claveAnterior", claveAnteriorEnviar.toString());
        parameters.set("claveNueva", claveNuevEnviar.toString());
        parameters.set("token", this.usuarioActual.token.hashId);
        const url = `${this.getURLServicio()}?`+parameters;;
        const httpOptions = {
          body: null,
        };

        this.http.post(url,  httpOptions).subscribe((data : any)   => {
          // data is already a JSON object
          this.control = data.control;

          debugger
          if (this.control.codigo == "OK"  ){
             // Intento parsear el usuario

             this.usuarioActual.token = new Token(data.datos.token);
             if (this.usuarioActual.token.hashId != null) {
              // COMO DEVUELVO ESTA RESPUESTA HACIA EL mi-cuenta.ts ?
              this.respuesta = this.control;
              // Pongo la bandera de logue en true
              this.logueado = true;
             }else{
              // COMO DEVUELVO ESTA RESPUESTA HACIA EL mi-cuenta.ts ?
              this.respuesta = this.control;

            }
          }else{

            this.respuesta = this.control;

            // Pongo la bandera de logue en true
            this.logueado = true;

          }


        });
        } catch (error: any) {

          const dataError = JSON.parse(error.error)
          reject(dataError.control.descripcion);
        }
      });

  } // FIN METODO


  /**
  * Esta funcion devuelve la URL del servicio
  */




  /**
  * Esta funcion devuelve la URL del servicio
  */
  private getURLServicio() {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return MiCuentaService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`+'/cambiarClaveApp';

  }

}

import { Cuenta } from 'src/app/modelo/cuenta';
import { Usuario } from 'src/app/modelo/usuario';
import { Injectable } from '@angular/core';

//------------ IMPORTO LAS LIBRERIAS QUE NECESITO ------------//
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Resumen } from 'src/app/modelo/resumen';


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
export class ResumenService {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.resumenUrl;
  public resumen: Resumen | any;
  public flag: boolean = false;
  //private loginService: LoginService | any;
  //---------------------------------------------//

  usuarioActual: any;
  resumenSocio: any;
  // Metodo constructor
  constructor(public http: HttpClient) { }
  public configuraciones = Configuraciones;
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
          this.resumenSocio = data;
          let control = this.resumenSocio.control;

          if (control.codigo == "OK"){
            this.resumen = new Resumen(this.resumenSocio.datos);
            resolve(
              {
                resumen: this.resumen,
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
    return ResumenService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`;
  }

}

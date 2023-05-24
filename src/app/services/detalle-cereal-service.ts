import { Cuenta } from 'src/app/modelo/cuenta';
import { Usuario } from 'src/app/modelo/usuario';
import { Injectable } from '@angular/core';

//------------ IMPORTO LAS LIBRERIAS QUE NECESITO ------------//
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { DetalleCereal } from 'src/app/modelo/detallecereal';


//------------IMPORTO LAS CLASES QUE NECESITO ------------//
//Le agrego el authService. Para que use el token.
import { LoginService } from 'src/app/services/login.service';

//Agrego las configuraciones
import { Configuraciones } from 'src/configuraciones/configuraciones'
import { Preferences } from '@capacitor/preferences';
/**
* Esta clase se creo para invocar el recurso del servicio web que devuelve el
* resumen de la cuenta
*/
@Injectable({
  providedIn: 'root'
})
export class DetalleCerealService {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.detalleCerUrl;
  public detalleCereal: DetalleCereal | any;
  public flag: boolean = false;
  //private loginService: LoginService | any;
  //---------------------------------------------//

  usuarioActual: any;

  // Metodo constructor
  constructor(public http: HTTP) { }
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
        const headers = { token: '' + this.usuarioActual.token.hashId };
        const response = await this.http.get(url, params, headers);
        const data = JSON.parse(response.data);

        if (data.control.codigo == "OK") {
          this.detalleCereal = new DetalleCereal(data.datos);
          resolve(
            {
              detalleCereal: this.detalleCereal,

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
    return DetalleCerealService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`;
  }

}

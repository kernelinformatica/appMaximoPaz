import { Cuenta } from 'src/app/modelo/cuenta';
import { Usuario } from 'src/app/modelo/usuario';
import { Injectable } from '@angular/core';

//------------ IMPORTO LAS LIBRERIAS QUE NECESITO ------------//
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Resumen } from 'src/app/modelo/resumen';


//------------IMPORTO LAS CLASES QUE NECESITO ------------//
//Le agrego el authService. Para que use el token.
import {LoginService} from 'src/app/services/login.service';

//Agrego las configuraciones
import { Configuraciones } from 'src/configuraciones/configuraciones'
/**
* Esta clase se creo para invocar el recurso del servicio web que devuelve el
* resumen de la cuenta
*/
@Injectable()
export class ResumenService {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.resumenUrl;
  public resumen : Resumen | any;
  public flag : boolean = false;
  private loginService : LoginService | any;
  //---------------------------------------------//

  // Metodo constructor
  constructor(public http: HTTP) {}
  public configuraciones = Configuraciones;
  // Este metodo invoca el servicio y parsea la respuesta
  public load() {

      this.loginService = LoginService.getInstance();

      return new Promise(async (resolve, reject) => {

        try {
      const url = `${this.configuraciones.resumenUrl}`;
      const params = {cuenta: this.loginService.usuarioActual.Cuenta};
      const headers = {token:''+this.loginService.usuarioActual.token.hashId};
      const response =  await this.http.post(url, params, headers);
      const data = JSON.parse(response.data);
      console.log(data);
      if (data.control.codigo == "OK") {
        let control : any = data.control;
        this.resumen = new Resumen(response);
        this.flag = true;
     // Almaceno la cuenta en el auth services
        this.loginService.cuenta = this.resumen.cuenta;


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
    return ResumenService.URLSERVICIO + `${this.loginService.usuarioActual.cuenta.id}`;
  }


}

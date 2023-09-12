// DARIO
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
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  detalleCerealSocio: any
  // Metodo constructor
  constructor(public http: HttpClient) { }
  public configuraciones = Configuraciones;
  // Este metodo invoca el servicio y parsea la respuesta
  public async load(cerealId? : string, claseId?: string, cosecha?: string) {

    const usuarioActualStr = localStorage.getItem('usuarioActual');
    if (usuarioActualStr) {
      this.usuarioActual = JSON.parse(usuarioActualStr);
    }




    return new Promise(async (resolve, reject) => {
      try {

       // Doy los valores por defecto, para que el codigo actual siga andando. Luego habría que forzar los argumentos.
        let cerealParam:string = cerealId?cerealId:'19';
        let claseParam:string = claseId?claseId:'001';
        let cosechaParam:string = cosecha?cosecha:'1516';
        ///Inicializo los parametros de GET
        let parameters:URLSearchParams = new URLSearchParams();
        parameters.set("cereal", cerealParam);
        parameters.set("clase", claseParam);
        parameters.set("cosecha", cosechaParam);

        const url = `${this.getURLServicio()}?`+parameters;
        const httpOptions = {
          body: null,
          headers: new HttpHeaders({
            token: this.usuarioActual.token.hashId,
          }),

        };

        this.http.get(url,  httpOptions).subscribe((data : any)   => {
          // data is already a JSON object

          this.detalleCerealSocio = data;
          let control = this.detalleCerealSocio.control;

          if (control.codigo == "OK"){
            this.detalleCereal = new DetalleCereal(this.detalleCerealSocio.datos);

            resolve(
              {
                detalleCereal: this.detalleCereal,
                funciones: this.usuarioActual.funciones
              });
          }
        });

      } catch (error: any) {
        //this.flag = false;
        alert("Ocurrio un error inesperado: "+error)

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

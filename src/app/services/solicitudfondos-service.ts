import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route, Router } from '@angular/router';
//------------ IMPORTO LAS LIBRERIAS QUE NECESITO ------------//




//------------IMPORTO LAS CLASES QUE NECESITO ------------//
//Le agrego el authService. Para que use el token.


//Agrego las configuraciones


import { Configuraciones } from 'src/configuraciones/configuraciones'
import { SolicitudFondos } from '../modelo/pedidos-fondos/solicitud-fondos';
import { Control } from '../modelo/control';
import { UiService } from './ui.service';
import { LoadingController } from '@ionic/angular';



/**
* Esta clase se creo para invocar el recurso del servicio web que devuelve el
* resumen de la cuenta
*/
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class SolicitudFondosService {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.solicitudFondosUrl;
  public solicitudFondos: SolicitudFondos[] = [];;
  public solicitudesFondosPendientes: SolicitudFondos[] = [];
  public solicitudesFondosTerminadas: SolicitudFondos[] = [];
  public flag : boolean = false;
  public respuesta : any | undefined;
  public usuarios : string[] = ["Ninguno", ""];
  public usuarioActual:any;
  public urlVer: any;
  //---------------------------------------------//

  // Metodo constructor
  constructor(public http: HttpClient, public uiService: UiService,
    public loadingController : LoadingController, private router: Router) {}

  // Este metodo invoca el servicio y parsea la respuesta
  public async load() {
    const usuarioActualStr = localStorage.getItem('usuarioActual');
    if (usuarioActualStr) {
      this.usuarioActual = JSON.parse(usuarioActualStr);
      return new Promise(async (resolve, reject) => {
        try {
          const url = `${this.getURLServicio()}`;
          const params = { };
          const httpOptions = {
            headers: new HttpHeaders({
              token: this.usuarioActual.token.hashId,

            }),
          };
          this.solicitudesFondosPendientes = [];
          this.solicitudesFondosTerminadas = [];
//          this.uiService.presentLoading("Aguarde un momento...")
          this.http.get(url,  httpOptions).subscribe((response : any)   => {
          let control = response.control;
          if (control.codigo == "OK"){
            if(response.datos.fondos.length > 0) {
              response.datos.fondos.sort((a:any, b:any) => new Date(a.fechaActualizado) <= new Date(b.fechaActualizado) ? 1 : -1);
              response.datos.fondos.forEach((element: any) => {
                  if(element.idEstado.idEstado === 1 || element.idEstado.idEstado ===2 || element.idEstado.idEstado === 3) {
                    this.solicitudesFondosPendientes.push(element);
                  }else{
                    // aca van las solicitudes finalizadas
                    this.solicitudesFondosTerminadas.push(element);
                  }
              });
              }else{

            }
              this.flag = true;
                resolve( { respuesta :this.solicitudesFondosPendientes,  });
            }


          });



       } catch (error: any) {

          this.uiService.dissmisLoading();
          const dataError = JSON.parse(error.error)
          reject(dataError.control.descripcion);

        }
      });



    }else{
      alert("xxx")
      return(false);
    }
  }


  public async traerHistorialFondos() {
    const usuarioActualStr = localStorage.getItem('usuarioActual');
    if (usuarioActualStr) {
      this.usuarioActual = JSON.parse(usuarioActualStr);
      return new Promise(async (resolve, reject) => {
        try {
          const url = `${this.getURLServicio()}`;
          const params = {codigoFuncion: 2 };
          const httpOptions = {
            headers: new HttpHeaders({
              token: this.usuarioActual.token.hashId,

            }),
          };
          this.http.get(url,  httpOptions).subscribe((response : any)   => {
           let control : Control = response.control;

           if (control.codigo === "OK"){


            if(response.datos.fondos.length > 0) {
              response.datos.fondos.sort((a:any, b:any) => new Date(a.fechaActualizado) <= new Date(b.fechaActualizado) ? 1 : -1);
              response.datos.fondos.forEach((element: any) => {
                  if(element.idEstado.idEstado === 1 || element.idEstado.idEstado ===2 || element.idEstado.idEstado === 3) {
                    this.solicitudesFondosPendientes.push(element);
                  }else{
                    // aca van las solicitudes finalizadas
                    this.solicitudesFondosTerminadas.push(element);
                  }
              });

            }else{

            }

          resolve(
            {

              respuesta :this.solicitudesFondosTerminadas,

            });
          }

          })
       } catch (error: any) {
          this.loadingController.dismiss();
          const dataError = JSON.parse(error.error)
          reject(dataError.control.descripcion);

        }
      });



    }else{

      return false



    }
  }



  public async crearSolicitud(aSolicitar: SolicitudFondos) {

alert(aSolicitar.fechaCobro)
    const usuarioActualStr = localStorage.getItem('usuarioActual');
    if (usuarioActualStr) {
      this.usuarioActual = JSON.parse(usuarioActualStr);
    //Armo las opciones del request.
   return new Promise(async (resolve, reject) => {
        try {

          const params = {};
          const url = `${this.getURLServicioSolicitarFondos()}`;
          const httpOptions = {
            headers: new HttpHeaders({
            token: this.usuarioActual.token.hashId,
            idTransaccion : aSolicitar.tipoTransaccion.idTipoTransaccion,
            cbuDestino : aSolicitar.destinoCbuPadron && (aSolicitar.tipoTransaccion.idTransaccion.idTransaccion == 6) ? aSolicitar.destinoCbuPadron.idCbuPadron : 0,
            chequeraCobro: aSolicitar.idChequera && aSolicitar.idChequera.idChequera && (aSolicitar.tipoTransaccion.idTransaccion.idTransaccion == 7) ? aSolicitar.idChequera.idChequera : 0,
            importe: aSolicitar.importe,
            fechaCobro : this.uiService.parseFecha(aSolicitar.fechaCobro),
            sucursalCobro: aSolicitar.sucursal && (aSolicitar.tipoTransaccion.idTransaccion.idTransaccion == 7) ? aSolicitar.sucursal.idSucursal : 0,
            observaciones: aSolicitar.observacion ? aSolicitar.observacion : ""
            }),

          };


          this.http.post(url, params, httpOptions).subscribe({
            next: (response: any) => {
              // data is already a JSON object
              let control : Control = response.control;
              if (control.codigo == "OK"){
                this.loadingController.dismiss();
                this.uiService.presentAlertInfo("Solicitud almacenada, Aguarde a que un operador apruebe su solicitud.")



                }else{
                  this.loadingController.dismiss();
                  this.uiService.presentAlertInfo("Solicitud fallida: u solicitud no pudo ser procesada, inténtelo más tarde.")
                }

            },
            error: (error: any) => {
            //  alert("Ocurrio un error inesperado, inténte nuevamente más tarde:  "+error.message)
              this.loadingController.dismiss();
              const dataError = JSON.parse(error.message)
              this.uiService.presentAlertInfo("Error de conexión: La conexión al servidor falló, inténtelo más tarde. "+dataError.control.descripcion)

            },
          });


        } catch (error: any) {

          const dataError = JSON.parse(error.message)
          this.uiService.presentAlertInfo("Error de conexión: La conexión al servidor falló, inténtelo más tarde. "+dataError.control.descripcion)
          reject(dataError.control.descripcion);

        }
      });
    }
  }

  /**
  * Esta funcion devuelve la URL del servicio  '/solicitar-fondos'
  */
  private getURLServicio() {
    // Por ahora devuelvo el string como esta, despues hay que usar el token

    //alert("getURLServicio() > "+SolicitudFondosService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`)
    return SolicitudFondosService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`;

  }
  private getURLServicioSolicitarFondos() {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
   //alert("getURLServicioSolicitarFondos() > "+SolicitudFondosService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`+'/solicitar-fondos')
    return SolicitudFondosService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`+'/solicitar-fondos';



  }

  public irAmisPedidos(){
    this.router.navigateByUrl('/pedidos-de-dinero/mis-pedidos')
   }
}

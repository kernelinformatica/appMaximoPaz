
import { Injectable } from '@angular/core';

//------------IMPORTO LAS CLASES QUE NECESITO ------------//
//Agrego las configuraciones
import { Configuraciones } from '../../configuraciones/configuraciones'
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { Moneda } from '../modelo/moneda';
import { CerealResumen } from '../modelo/cerealResumen';



@Injectable({
  providedIn: 'root'
})
export class CerealResumenService {
  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.cerealesResumenUrl;
  public cerealResumenes: any; //CerealResumen[] = [];

  public flag : boolean = false;
  public usuarioActual: any;
  //---------------------------------------------//

  constructor(public http: HttpClient) { }

public load(cereal: string, sf: any) {
  const usuarioActualStr = localStorage.getItem('usuarioActual');
  if (usuarioActualStr) {
    this.usuarioActual = JSON.parse(usuarioActualStr);
  }



  return new Promise(async (resolve, reject) => {
    try {
      let parameters:URLSearchParams = new URLSearchParams();
      parameters.set("cerealCodigo", cereal);
      parameters.set("sinFiltro", sf);
      const url = `${this.getURLServicio()}?`+parameters;;
      const params = { };

      const httpOptions = {
        body: null,
        headers: new HttpHeaders({
          token: this.usuarioActual.token.hashId,

        }),
      };

      this.http.get(url,  httpOptions).subscribe((data : any)   => {
        // data is already a JSON object
        this.cerealResumenes = data.datos
        let control = data.control;
        debugger
        if (control.codigo == "OK"){

          resolve(
            {
              cerealResumenes: this.cerealResumenes

            });
        }


      });


    } catch (error: any) {

      //const dataError = JSON.parse(error.error)
      //reject(dataError.control.descripcion);
    }
  });

}
  /**
  * Esta funcion devuelve la URL del servicio
  */
  private getURLServicio() {
    return CerealResumenService.URLSERVICIO +`cosechas/${this.usuarioActual.cuenta.id}`;
  }


}

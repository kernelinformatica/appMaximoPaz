
import { Injectable } from '@angular/core';

//------------IMPORTO LAS CLASES QUE NECESITO ------------//
//Agrego las configuraciones
import { Configuraciones } from '../../configuraciones/configuraciones'
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { Moneda } from '../modelo/moneda';


@Injectable({
  providedIn: 'root'
})
export class MonedasService {
 //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.monedasUrl;
  public monedas: Moneda[] = [];
  public flag : boolean = false;
  public usuarioActual:any;
  //---------------------------------------------//

  constructor(public http: HttpClient) { }
  public load() {
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
          this.monedas = data.datos.monedas;
          let control = data.control;

          if (control.codigo == "OK"){
         //   this.mercados = new Mercado(this.mercado.datos);
            resolve(
              {
                monedas: this.monedas,

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
    return MonedasService.URLSERVICIO +`${this.usuarioActual.cuenta.id}`;
  }


}

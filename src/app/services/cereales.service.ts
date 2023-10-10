import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuraciones } from 'src/configuraciones/configuraciones';
import { Cereal } from '../modelo/cereal';

@Injectable({
  providedIn: 'root'
})
export class CerealesService {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.cerealesUrl;
  public cereales: Cereal[] = [];
  public flag : boolean = false;
  public cerealesExcluidos : string[] = ["08"];
  public usuarioActual:any;
  public cereal : any;
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
          this.cereal = data.datos.cereales;
          let control = data.control;

          if (control.codigo == "OK"){
         //   this.mercados = new Mercado(this.mercado.datos);
            resolve(
              {
                cereal: this.cereal,

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
    // Por ahora devuelvo el string como esta, despues hay que usar el token

      return CerealesService.URLSERVICIO  +`${this.usuarioActual.cuenta.id}`;

  }

}

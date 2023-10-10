
import { Injectable } from '@angular/core';

//------------IMPORTO LAS CLASES QUE NECESITO ------------//
//Agrego las configuraciones
import { Configuraciones } from '../../configuraciones/configuraciones'
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { Mercado } from '../modelo/mercado';


@Injectable({
  providedIn: 'root'
})
export class OrdenVentasMercadosService {
 //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.mercadosUrl;
  public mercados: Mercado[] = [];
  public mercado: any;
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
          this.mercado = data.datos.mercados;
          let control = data.control;

          if (control.codigo == "OK"){
         //   this.mercados = new Mercado(this.mercado.datos);
            resolve(
              {
                mercado: this.mercado,

              });
          }


        });


      } catch (error: any) {

        const dataError = JSON.parse(error.error)
        reject(dataError.control.descripcion);
      }
    });
    /*this.authService = AuthService.getInstance();
    if(this.authService.usuarioActual) {
      //Armo las opciones del request.
      let basicOptions:RequestOptionsArgs = {
        url: this.getURLServicio(),
        method: RequestMethod.Get,
        search: null,
        headers: new Headers({token:''+this.authService.usuarioActual.token.hashId}),
        body: null
      };
      var reqOptions = new RequestOptions(basicOptions);
      var req = new Request(reqOptions);

      return this.http.request(req).map(res => { return res.json()}).subscribe(response => {
        let control : any = response.control;
        if(control.codigo == "OK"){
          console.log(response.datos);
          this.mercados = response.datos.mercados;
          this.flag = true;
        }
      }, err => {
        let alert = this.alertCtrl.create({
            title: 'Error de conexión',
            subTitle: 'El servidor no pudo traer los mercados, inténtelo más tarde.',
            buttons: ['OK']
        });
        alert.present();
    });
    }*/
}






  /**
  * Esta funcion devuelve la URL del servicio
  */
  private getURLServicio() {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return OrdenVentasMercadosService.URLSERVICIO +`${this.usuarioActual.cuenta.id}`;
  }


}

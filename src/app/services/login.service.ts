import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

import { Configuraciones } from '../../configuraciones/configuraciones';
import { Usuario } from 'src/app/modelo/usuario';
import { Cuenta } from 'src/app/modelo/cuenta';
import { Login } from 'src/app/modelo/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public usuarioActual: Usuario | any;
  public logueado: boolean = false;
  public static instancia: LoginService;
  public servicioDisponible = true;
  public static conexion: any;
  public cuenta: Cuenta | any;
  public versionServicio: string | any;
  public versionGestagro: string | any;
  public configuraciones = Configuraciones;

  constructor(private http: HttpClient) { }

  loginUser(login: Login) {
    return new Promise(async (resolve, reject) => {
      try {
        const hash = CryptoJS.MD5(login.clave);
        const url = this.getURLServicio(login.usuario);
        const params = {};
        const httpOptions = {
          headers: new HttpHeaders({
            clave: hash.toString(),
          }),
        };

        this.http.post(url, params, httpOptions).subscribe({
          next: (data: any) => {
            // data is already a JSON object
            this.usuarioActual = data;

            //let data = JSON.parse(resp.toString());
            if (this.usuarioActual.control.codigo == 'OK') {
              let control = this.usuarioActual.control;
              this.usuarioActual = new Usuario(this.usuarioActual.datos);
              debugger
              //Seteo como logueado.

              this.logueado = true;
              //Guardos las versiones de la lib y de gestagro.
              this.versionGestagro = control.versionLib;
              this.versionServicio = control.version;
              this.saveStorage(control);
              resolve(true);
            } else {
              resolve(false);
              //reject(this.usuarioActual.control?.descripcion ?? 'Error al autenticar.');
            }
          },
          error: (error: any) => {
            resolve(false);
          }
        })
      } catch (error: any) {
        alert('Error: Ocurrio un error general, intente nuevamente más tarde.');
        const dataError = JSON.parse(error.error);
        reject(dataError.control.descripcion);
      }
    });
  }

  recuperarClave(login: Login) {
    return new Promise(async (resolve, reject) => {

      try {

        const url = this.getURLRecuperarClave(login.usuario);
        const params = {};
        const httpOptions = {};

        this.http.post(url, params, httpOptions).subscribe({
          next: (data: any) => {
            if (data.control.codigo == "OK"){
              resolve({ email: data.control.descripcion });
            } else {
              resolve(null);
            }
          },
          error: (error: any) => {
            reject(error);
          }
        })

      } catch (error: any) {
        alert("Error: Ocurrio un error general, intente nuevamente más tarde.")
        const dataError = JSON.parse(error.error)
        reject(dataError.control.descripcion);
      }
    });

  }

  /**
  * Esta funcion devuelve la URL del servicio
  */
  private getURLServicio(usuario: string) {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return Configuraciones.authUrl + usuario;
  }

  /**
   * Esta funcion devuelve la URL del servicio
   */
  private getURLRecuperarClave(usuario: string) {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return Configuraciones.authUrl + usuario + "/recuperarClave";
  }

  saveStorage(control: any) {
    localStorage.setItem('control', JSON.stringify(control));
    localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
  }
}

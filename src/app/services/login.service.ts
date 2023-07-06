import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { Http } from '@capacitor-community/http';
import { Configuraciones } from '../../configuraciones/configuraciones';
import { Usuario } from 'src/app/modelo/usuario';
import { Cuenta } from 'src/app/modelo/cuenta';
import { Login } from 'src/app/modelo/login';
import { IonRefresher } from '@ionic/angular';
import { Observable, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public usuarioActual: Usuario | any;
  public usuarioGrabado: Usuario | any;
  public logueado: boolean = false;
  public static instancia: LoginService;
  public servicioDisponible = false;
  public static conexion: any;
  public cuenta: Cuenta | any;
  public versionServicio: string | any;
  public versionGestagro: string | any;
  public configuraciones = Configuraciones;
  public msgLoginRepuesta: string | any;
  public timeOut : any;
  constructor(private http: HttpClient) {}

  loginUser(login: Login, remember?: boolean) {
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

            if (data.datos.empresa.AccesoAppMovil == true) {
              //let data = JSON.parse(resp.toString());
              if (this.usuarioActual.control.codigo == 'OK') {
                let control = this.usuarioActual.control;
                this.usuarioActual = new Usuario(this.usuarioActual.datos);
                this.logueado = true;

                //Guardos las versiones de la lib y de gestagro.
                this.versionGestagro = control.versionLib;
                this.versionServicio = control.version;
                //En caso de que se haya pedido recordar el usuario:
                this.saveStorage(control);
                resolve('1');
              } else {
                resolve('0');
                //reject(this.usuarioActual.control?.descripcion ?? 'Error al autenticar.');
              }
            } else {
              // Cliente  sin permisos

              resolve('2');
            }
          },
          error: (error: any) => {
            resolve(false);
          },
        });
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
            if (data.control.codigo == 'OK') {
              resolve({ email: data.control.descripcion });
            } else {
              resolve(null);
            }
          },
          error: (error: any) => {
            reject(error);
          },
        });
      } catch (error: any) {
        alert('Error: Ocurrio un error general, intente nuevamente más tarde.');
        const dataError = JSON.parse(error.error);
        reject(dataError.control.descripcion);
      }
    });
  }

  /*
    Éste método valida que se pueda hacer login con las credenciales guardadas.
    devuelve true o false según se pudo o no.
  */
  async trySavedLogin() {


    //return new Promise(async (resolve, reject) => {
    //  try {
    let credenciales: any = localStorage.getItem('usuarioActual');
    this.usuarioGrabado = JSON.parse(credenciales);
    console.log('Hay credenciales! :) -> ' + credenciales);
    console.log('Token valido hasta: ' + this.usuarioGrabado.token.fechaHasta);
    const today = new Date();
    const fechaHoy = today.toDateString();
    let fechaToken = new Date(this.usuarioGrabado.token.fechaHasta);
    let fechaActual = new Date(fechaHoy);
    if (this.usuarioGrabado.token.hashId != '') {
      return new Promise(async (resolve, reject) => {
        let token: string = this.usuarioGrabado.token.hashId;
        let parametros: URLSearchParams = new URLSearchParams();
        parametros.set('token', token);
        resolve(true);

        try {
          const url =
            `${this.getUrlTestToken(this.usuarioGrabado.cuenta.id)}?` +
            parametros;
          const params = { parametros };
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded',
              token: token,
            }),
          };

          this.http.get(url, httpOptions).subscribe((resp: any) => {
            let control = resp.control;
            if (control.codigo == 'OK') {
              // si no tien permiso la coope lo pateo

              this.versionGestagro = control.versionLib;
              this.versionServicio = control.version;
              this.usuarioActual = this.usuarioGrabado;

              this.logueado = true;
            } else {
              this.logueado = false;
            }
          });
        } catch (error: any) {
          const dataError = JSON.parse(error.error);
          reject(dataError.control.descripcion);
        }
      });

      /*

              */
    } else {
      console.log('se debe loguear ):');
      // no hay credenciales asi que lo mando a pantalla de login
    }
    //this.loginUser();

    /*} catch (error: any) {
          debugger
          alert('Error: Ocurrio un error general, intente nuevamente más tarde.');
          const dataError = JSON.parse(error.error);
          reject(dataError.control.descripcion);
        }*/
    // });
  }

  public logout(): void {
    // Seteo el usuario actual en null
    this.usuarioActual = null;
    this.deleteStorage();
    // Seteo la bandera como deslogueado
    this.logueado = false;
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
    return Configuraciones.authUrl + usuario + '/recuperarClave';
  }

  saveStorage(control: any) {
    localStorage.setItem('control', JSON.stringify(control));
    localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
  }
  deleteStorage() {
    localStorage.removeItem('control');
    localStorage.removeItem('usuarioActual');
    localStorage.clear();
  }

  public getUrlTestToken(usuario: string): string {
    return Configuraciones.authUrl + usuario + '/testToken';
  }

  public validarServicioSiEstaDisponible() {

   console.log('Valido servicio -> '+this.getURLDummy());
   const url = `${this.getURLDummy()}`;
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    this.http.get(url).pipe(
    ).subscribe(
      (resp) => {

        this.servicioDisponible = true;
      }
    );

  } catch (error: any) {
    const dataError = JSON.parse(error.error);
    this.servicioDisponible = false;
  }

  /**
   * Esta funcion devuelve la URL del recurso Dummy
   */
  private getURLDummy() {
    return Configuraciones.dummyUrl;
  }
}

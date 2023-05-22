import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import * as CryptoJS from 'crypto-js';
import { Configuraciones } from '../../configuraciones/configuraciones';
import { environment } from '../../environments/environment';
import { Usuario } from 'src/app/modelo/usuario';
import { Cuenta } from 'src/app/modelo/cuenta';
// INTERFACES
import { Login } from 'src/app/modelo/login';

@Injectable({
    providedIn: 'root'
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

    constructor(private http: HTTP) { }

    loginUser(login: Login) {
        return new Promise(async (resolve, reject) => {

            try {

                const hash = CryptoJS.MD5(login.clave);
                const url = `${this.configuraciones.authUrl}${login.usuario}`;
                const params = {};
                const headers = { clave: hash.toString() };

              //Centraliza llamadas a los métodos
              const response = await this.http.post(url, params, headers);

              const data = JSON.parse(response.data)

                //Agregar otros casos al realizar login

                if (data.control.codigo == "OK") {
                      let control = data.control;
                      this.usuarioActual = new Usuario(data.datos);
                      //Seteo como logueado.
                      this.logueado = true;
                      //Guardos las versiones de la lib y de gestagro.
                      this.versionGestagro = control.versionLib;
                      this.versionServicio = control.version;
                      resolve(true);

                } else {
                    reject(data.control?.descripcion ?? "Error al autenticar.");
                }

            } catch (error: any) {
                alert("Error: Ocurrio un error general, intente nuevamente más tarde.")
                const dataError = JSON.parse(error.error)
                reject(dataError.control.descripcion);
            }
        });

    }

    private async clearStorage() {
        await Preferences.clear();
    }
    public static getInstance(): LoginService {
      // Sucio, por ahora.
      return LoginService.instancia;
    }

}

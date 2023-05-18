import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import * as CryptoJS from 'crypto-js';

import { environment } from '../../environments/environment';

// INTERFACES
import { Login } from '../interfaces/login.interface';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private get urlAuthentication() {
        return `${environment.urlBase}/usuarios`;
    }

    constructor(private http: HTTP) { }

    loginUser(login: Login) {
        return new Promise(async (resolve, reject) => {

            try {

                const hash = CryptoJS.MD5(login.claveOperador);
                const url = `${this.urlAuthentication}/${login.numOperador}`;
                const params = {};
                const headers = { clave: hash.toString() };

                //Centraliza llamadas a los métodos
                const response = await this.http.post(url, params, headers);
                const data = JSON.parse(response.data)
                console.log(data);

                //Agregar otros casos al realizar login

                if (data.control.codigo == "OK") {
                    resolve(true);
                } else {
                    reject(data.control?.descripcion ?? "Error al autenticar.");
                }

            } catch (error: any) {
                const dataError = JSON.parse(error.error)
                reject(dataError.control.descripcion);
            }
        });

    }

    private async clearStorage() {
        await Preferences.clear();
    }


}

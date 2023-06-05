import { Injectable } from "@angular/core";
import { Configuraciones } from "src/configuraciones/configuraciones";
import { Notificacion } from "../modelo/notificacion";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class NotificacionesService {
    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public static URLSERVICIO: string = Configuraciones.notificacionesUrl;
    public notificaciones: Notificacion[] = [];
    public flag: boolean = false;
    public ver: boolean = false;
    public numeroMensajes: number = 0;

    usuarioActual: any;
    //---------------------------------------------//

    // Metodo constructor
    constructor(public http: HttpClient) { }

    public async load() {
        const usuarioActualStr = localStorage.getItem('usuarioActual');

        if (usuarioActualStr) {
            this.usuarioActual = JSON.parse(usuarioActualStr);
        }

        return new Promise(async (resolve, reject) => {
            try {
                const url = `${this.getURLServicio()}`;
                const httpOptions = {
                    headers: new HttpHeaders({
                        token: this.usuarioActual.token.hashId,
                    }),
                };

                this.http.get(url, httpOptions).subscribe((data: any) => {
                    let control = data.control;

                    if (control.codigo == "OK") {
                        this.notificaciones = data.datos.mensajes;
                        resolve(
                            {
                                notificaciones: this.notificaciones
                            });
                    }
                });
            } catch (error: any) {
                const dataError = JSON.parse(error.error)
                reject(dataError.control.descripcion);
            }
        });
    }

    public async borrarNotificacion(idMensaje: number) {
        const usuarioActualStr = localStorage.getItem('usuarioActual');

        if (usuarioActualStr) {
            this.usuarioActual = JSON.parse(usuarioActualStr);
        }

        return new Promise(async (resolve, reject) => {
            try {
                const url = `${this.getURLServicio()}/borrar`;
                const httpOptions = {
                    headers: new HttpHeaders({
                        token: this.usuarioActual.token.hashId,
                        idMensaje: idMensaje
                    }),
                };

                this.http.post(url, httpOptions).subscribe((data: any) => {
                    let control = data.control;
                    if (control.codigo == "OK") {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            } catch (error: any) {
                const dataError = JSON.parse(error.error)
                reject(dataError.control.descripcion);
            }
        });
    }

    public async vistearMensaje(idMensaje: number) {
        const usuarioActualStr = localStorage.getItem('usuarioActual');

        if (usuarioActualStr) {
            this.usuarioActual = JSON.parse(usuarioActualStr);
        }

        return new Promise(async (resolve, reject) => {
            try {
                const url = `${this.getURLServicio()}/visto`;
                const httpOptions = {
                    headers: new HttpHeaders({
                        token: this.usuarioActual.token.hashId,
                        idMensaje: idMensaje
                    }),
                };

                this.http.post(url, httpOptions).subscribe((data: any) => {
                    let control = data.control;
                    if (control.codigo == "OK") {
                        resolve(true);
                    } else {
                        resolve(false);
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
        // Por ahora devuelvo el string como esta, despues hay que usar el token
        return NotificacionesService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`;
    }
}
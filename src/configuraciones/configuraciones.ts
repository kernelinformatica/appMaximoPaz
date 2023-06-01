/**
 * Clase de configuraciones para la aplicación.
 */

export class Configuraciones
{

  // public static urlBase : string = "http://localhost:8080/gestagroex-rest/ws"; //local
    public static urlBase : string = "http://www.gestagro.com.ar/gestagroex-v4/ws"; //Produccion
    public static dummyUrl : string = `${Configuraciones.urlBase}/dummy`;
    public static authUrl : string = `${Configuraciones.urlBase}/usuarios/`;
    public static detalleCerUrl : string = `${Configuraciones.urlBase}/detallecer/`;
    public static detalleCtaCteUrl : string = `${Configuraciones.urlBase}/detallecc/`;
    public static resumenUrl : string = `${Configuraciones.urlBase}/resumen/`;
    public static notificacionesUrl: string = `${Configuraciones.urlBase}/notificaciones/`;
    public static version : string = "0.01B";
}

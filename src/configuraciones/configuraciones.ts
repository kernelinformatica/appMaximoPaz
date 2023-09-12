/**
 * Clase de configuraciones para la aplicación.
 */

export class Configuraciones
{

    public static codigoCliente = '05';
    public static urlBase : string = "https://www.gestagro.com.ar/gestagroex-v6/ws"; //Produccion
    public static dummyUrl : string = `${Configuraciones.urlBase}/dummy`;
    public static authUrl : string = `${Configuraciones.urlBase}/usuarios/`;
    public static miCuentaUrl : string = `${Configuraciones.urlBase}/usuarios/`;
    public static detalleCerUrl : string = `${Configuraciones.urlBase}/detallecer/`;
    public static detalleCtaCteUrl : string = `${Configuraciones.urlBase}/detallecc/`;
    public static resumenUrl : string = `${Configuraciones.urlBase}/resumen/`;
    public static notificacionesUrl: string = `${Configuraciones.urlBase}/notificaciones/`;
    //public static rutaLogos : string = "assets/images/logos/";
   public static rutaLogos : string = "https://www.kernelinformatica.com.ar/applications/apps/gestagro/logos/";
   public static serviciosWebURL : string = `https://www.kernelinformatica.com.ar/app/webservices/public/ws.php`;
   //public static serviciosWebURL : string = `https://www.kernelinformatica.com.ar/app/webservices/public/servicios-web-rest.php`;
    public static version : string = "1.0";
}

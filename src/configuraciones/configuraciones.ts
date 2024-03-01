/**
 * Clase de configuraciones para la aplicación.
 */

export class Configuraciones
{

    public static codigoCliente = '05';
    public static razonSocialCliente = "Cooperativa Agropecuaria Ltda. de Máximo Paz";
    public static razonSocialNombreCorto = "Coopaz"
    /*

    Produccion

    */
  //
  public static urlBaseImgs = "https://www.maximopazcoop.com.ar/i/images_app";
  public static urlBase : string = "https://www.gestagro.com.ar/gestagroex-v9/ws";

   /*

   Desarrollo

   */
  // public static urlBase : string = "http://localhost:8080/gestagroex-rest/ws";




    public static dummyUrl : string = `${Configuraciones.urlBase}/dummy`;
    public static authUrl : string = `${Configuraciones.urlBase}/usuarios/`;
    public static miCuentaUrl : string = `${Configuraciones.urlBase}/usuarios/`;
    public static detalleCerUrl : string = `${Configuraciones.urlBase}/detallecer/`;
    public static detalleCtaCteUrl : string = `${Configuraciones.urlBase}/detallecc/`;
    public static resumenUrl : string = `${Configuraciones.urlBase}/resumen/`;
    public static notificacionesUrl: string = `${Configuraciones.urlBase}/notificaciones/`;
    public static bancosUrl = `${Configuraciones.urlBase}/bancos/`;
    public static cerealesUrl : string = `${Configuraciones.urlBase}/cereales/`;
    public static cbuPadronUrl: string = `${Configuraciones.urlBase}/cbu-padron/`;
    public static monedasUrl: string = `${Configuraciones.urlBase}/monedas/`;
    public static transaccionesUrl: string = `${Configuraciones.urlBase}/transacciones/`;
    public static sucursalesUrl: string = `${Configuraciones.urlBase}/sucursales/`;
    public static solicitudFondosUrl: string = `${Configuraciones.urlBase}/fondos/`;
    public static chequerasUrl: string = `${Configuraciones.urlBase}/chequeras/`;
    public static reservaUrl : string = `${Configuraciones.urlBase}/reservas/`;
    public static reservaAdminUrl : string = `${Configuraciones.urlBase}/reservas-admin/`;
    public static mercadosUrl: string = `${Configuraciones.urlBase}/mercados/`;
    public static cerealesResumenUrl : string = `${Configuraciones.urlBase}/cereal-resumen/`;
    public static ordenesVentaUrl: string = `${Configuraciones.urlBase}/ordenes/`;

  public static rutaLogos : string = "assets/images/";
  // public static rutaLogos : string = "https://www.kernelinformatica.com.ar/applications/apps/gestagro/logos/";
   public static serviciosWebURL : string = `https://www.kernelinformatica.com.ar/app/webservices/public/ws.php`;
   //public static serviciosWebURL : string = `https://www.kernelinformatica.com.ar/app/webservices/public/servicios-web-rest.php`;
    public static version : string = "1.0";
    public static pathImagenesNoticias = "/i/news/";
    public static intervaloDeAutoActualizacion =  20000;
    // 10 segundos: 10000
    // 30 segundos: 30000
    // 5 minutos: 300000
    // 15 minutos : 9000000
}

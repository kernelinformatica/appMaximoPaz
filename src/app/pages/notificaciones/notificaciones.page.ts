import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Notificacion } from 'src/app/modelo/notificacion';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { UiService } from 'src/app/services/ui.service';
import { Configuraciones } from 'src/configuraciones/configuraciones';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  estadoLeido: String | undefined;
  istodoCargado = false;
  notificaciones: Notificacion[] = [];
  tieneNotificaciones = false;
  numeroMensajes: number = 0;
  colorNoti: any;
  apiCallSubscription: Subscription = new Subscription;
  constructor(public notificacionesService: NotificacionesService,
              private uiService: UiService) { }

  ngOnInit() {
    this.cargarNotificaciones();

    this.apiCallSubscription = interval(Configuraciones.intervaloDeAutoActualizacion).subscribe(() => {
      this.cargarNotificaciones();
    });

  }
  ngOnDestroy(): void {

    // Cuando el componente se destruye, desuscribirse
    this.apiCallSubscription.unsubscribe();
  }
  //spaghetti
  public borrarNotificacion(mensaje: Notificacion) {

    if (mensaje && mensaje.idMensaje) {
      this.notificacionesService.borrarNotificacion(mensaje.idMensaje).then(
        resp => {
          if(resp){
            this.cargarNotificaciones();
          } else {
            this.uiService.presentAlertInfo('El servidor no pudo borrar la notificacion, inténtelo más tarde.');
          }
        }
      );
    }
  }

  public vistearMensaje(mensaje: Notificacion) {
    if (mensaje && mensaje.idMensaje) {
      this.notificacionesService.vistearMensaje(mensaje.idMensaje).then(
        resp => {
          if(resp){
            this.cargarNotificaciones();
          } else {
            this.uiService.presentAlertInfo('El servidor no pudo vistear la notificacion, inténtelo más tarde.');
          }
        }
      );
    }
  }

  public verNotificacion(mensaje: Notificacion) {
    if (mensaje) {
      this.vistearMensaje(mensaje);

      if(mensaje.mensaje) {
        this.uiService.presentAlertInfo(mensaje.mensaje);
      }
    }
  }
  public muestraVistoSn(item: any){

    if (item.visto === true){

      if (item.titulo == "Su orden está rechazado/a"){
        this.colorNoti = "color: white";
        return "danger";
      }else if(item.titulo == "Su pedido está rechazado/a") {
        this.colorNoti = "color: white";
        return "danger";
      }else if (item.titulo == "Su orden está aprobado/a"){
        this.colorNoti = "color: black";
        return "success";
      }else if (item.titulo == "Su pedido está aprobado/a"){
        this.colorNoti = "color: black";
        return "success";
      }else if (item.titulo == "Su pedido está finalizado/a  por parte de la Administración"){
        this.colorNoti = "color: #282828";
        return "medium";
      }else if (item.titulo == "Su orden está finalizado/a  por parte de la Administración"){

        this.colorNoti = "color: #282828";
        return "medium";
      }else{
        this.colorNoti = "color: black";
        return "success";
      }


    }else{

      if (item.titulo == "Su orden está rechazado/a"){
        this.colorNoti = "color: white";
        return "danger";
      }else if(item.titulo == "Su pedido está rechazado/a") {
        this.colorNoti = "color: white";
        return "danger";
      }else if (item.titulo == "Su orden está aprobado/a"){
        this.colorNoti = "color: black";
        return "success";
      }else if (item.titulo == "Su pedido está aprobado/a"){
        this.colorNoti = "color: black";
        return "success";
      }else if (item.titulo == "Su pedido está finalizado/a  por parte de la Administración"){
        this.colorNoti = "color: #282828";
        return "medium";
      }else if (item.titulo == "Su orden está finalizado/a  por parte de la Administración"){
        this.colorNoti = "color: #282828";
        return "medium";
      }else{
        this.colorNoti = "color: black";
        return "success";
      }


     }


 }
 public muestraVistoSnColor(item: any){
  if (item.visto === true){
    return "visto";


  }else{
    return "noVisto";

  }


 }

 public mostrarSobreLeidoNoLeido(item: any){
  if (item.visto === true){
    return "mail-open-outline";

 }else{
    return "mail-unread-outline";

  }
 }
  private cargarNotificaciones(){
    this.notificacionesService.load().then(
      async (resp: any) => {
        if(resp) {
          this.notificaciones = resp.notificaciones;
          this.numeroMensajes = this.notificaciones.length;
          this.istodoCargado = true;
        }
      }
    );

/// observable que se ejecuta cada cierto tiempo para verificar si hay nuevas notificaciones





  }

  parseFecha(fecha: any) {
    const fechaDate = new Date(fecha);
    const fechaParseada =   (fechaDate.getUTCDate() < 10 ? ("0" + fechaDate.getUTCDate().toString()) : fechaDate.getUTCDate().toString())
                            + "/" +
                            (fechaDate.getUTCMonth() < 10 ? ("0" + (fechaDate.getUTCMonth() + 1).toString()) : (fechaDate.getUTCMonth() + 1).toString())
                            + "/" +
                            (fechaDate.getUTCFullYear().toString().substr(2, 2)) ;
    return fechaParseada;
  }





}

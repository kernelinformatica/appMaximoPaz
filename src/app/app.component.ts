import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Configuraciones } from 'src/configuraciones/configuraciones';
import { Router } from '@angular/router';
import { FcmService } from './services/fcm/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {


  constructor(private platform: Platform, private router: Router, private fcm: FcmService) {
    /*
    Este código elimina todas las entradas del caché de la aplicación cuando se carga la plataforma. De esta manera,
    se asegura de que la aplicación siempre esté utilizando los archivos más recientes y no los archivos almacenados en caché.
    */


    this.initializeApp();
    this.platform.ready().then(() => {
        this.fcm.initPush();
      if (window.caches) {
        caches.keys().then(function(names) {
          for (let name of names) caches.delete(name);
        });
      }
  });
  }

  public appPages = [
    { title: 'Inicio / Resumen', url: '/resumen', icon: 'home' },
    { title: 'Mi Cuenta', url: '/mi-cuenta', icon: 'person' },



  ];
  public temp = "";
  public labels = ["etiquetas 1", 'etiqueta 2'];

  public getLogoEmpresa() {
    let logo = "";
    let clientJson =localStorage.getItem('usuarioActual');
    let url = Configuraciones.urlBaseImgs+"/";
    if (typeof clientJson === 'string') {
      var parsedData = JSON.parse(clientJson);
      //logo = Configuraciones.rutaLogos+parsedData.empresa.id+".png";
      logo = url+parsedData.empresa.id+".png";
     // alert(logo)
      clientJson = "";
       return logo;
  } else {

      return "assets/images/logos/05.png";
    }

  }

  public irAlegales(){
    this.router.navigateByUrl('/legales')

  }
  public salirDelSistema(){

    this.router.navigateByUrl('/logout');

  }
  public irAPedidoDeDinero(){
    this.router.navigateByUrl('/pedidos-de-dinero/pedir-dinero')
   }
  public irAOrdenesDeVenta(){
    this.router.navigateByUrl('/ordenes-de-venta/ordenar')

  }
/*
  public getNombreEmpresa() {

    if (typeof this.clientJson === 'string') {
      const parsedData = JSON.parse(this.clientJson);
      return parsedData.empresa.nombreCompleto;
    } else {
      return "";
    }
  }*/

  initializeApp(){


  }



}

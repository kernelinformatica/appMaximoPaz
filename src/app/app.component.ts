import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Configuraciones } from 'src/configuraciones/configuraciones';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor(private platform: Platform, ) {
    /*
    Este código elimina todas las entradas del caché de la aplicación cuando se carga la plataforma. De esta manera,
    se asegura de que la aplicación siempre esté utilizando los archivos más recientes y no los archivos almacenados en caché.
    */
    this.initializeApp();
    this.platform.ready().then(() => {
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
    { title: 'Acerca de', url: '/acerca', icon: 'business' },
    { title: 'Legales', url: '/legales', icon: 'information-circle' },
    { title: 'Cerrar Sesión', url: '/logout', icon: 'log-out' },

  ];
  public temp = "";

  public labels = ["etiquetas 1", 'etiqueta 2'];

  public getLogoEmpresa() {
    let logo = "";
    let clientJson =localStorage.getItem('usuarioActual');
    if (typeof clientJson === 'string') {
      var parsedData = JSON.parse(clientJson);
      logo = Configuraciones.rutaLogos+parsedData.empresa.id+".png";

      clientJson = "";
       return logo;
  } else {

      return "assets/images/logos/00.png";
    }

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
    //alert("Inicializa app")
  }



}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor() {}

  public appPages = [
    { title: 'Inicio / Resumen', url: '/resumen', icon: 'home' },
    { title: 'Resumen Ctacte', url: '/detalle-ctacte', icon: 'receipt' },
    { title: 'Resumen Cereales', url: '/detalle-cereal', icon: 'receipt' },
    { title: 'Mi Cuenta', url: '/resumen', icon: 'person' },
    { title: 'Acerca de', url: '/acerca', icon: 'business' },
    { title: 'Cerrar Sesión', url: '', icon: 'log-out' },

  ];

  public clientJson = localStorage.getItem('usuarioActual')?.toString();
  public labels = ["etiquetas 1", 'etiqueta 2'];
  public getLogoEmpresa() {
    if (typeof this.clientJson === 'string') {
      const parsedData = JSON.parse(this.clientJson);
     return "http://www.gestagro.com.ar/clientes/movil/logos/"+parsedData.empresa.id+".png";
    } else {
      return "http://www.gestagro.com.ar/clientes/movil/logos/00.png";
    }

  }


  public getNombreEmpresa() {

    if (typeof this.clientJson === 'string') {
      const parsedData = JSON.parse(this.clientJson);
      return parsedData.empresa.nombreCompleto;
  } else {
    return "";
  }


  }

}

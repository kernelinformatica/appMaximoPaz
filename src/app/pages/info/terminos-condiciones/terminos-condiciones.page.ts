import { Component, OnInit } from '@angular/core';

import { Configuraciones } from 'src/configuraciones/configuraciones';
@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.page.html',
  styleUrls: ['./terminos-condiciones.page.scss'],
})
export class TerminosCondicionesPage implements OnInit {

  constructor() { }
   razonSocial = Configuraciones.razonSocialCliente;
  ngOnInit() {
  }

}

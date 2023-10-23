import { Component, OnInit } from '@angular/core';
import { Configuraciones } from 'src/configuraciones/configuraciones';
@Component({
  selector: 'app-politica',
  templateUrl: './politica.page.html',
  styleUrls: ['./politica.page.scss'],
})
export class PoliticaPage implements OnInit {

  constructor() { }
  razonSocial = Configuraciones.razonSocialCliente;
  ngOnInit() {
  }

}

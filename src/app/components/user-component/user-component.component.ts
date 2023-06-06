import { Component, OnInit } from '@angular/core';
import { ResumenService } from 'src/app/services/resumen.service';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.scss'],
})
export class UserComponent implements OnInit {

  cuenta: any;
  data: any;
  resumen: any;

  constructor(public resumenService: ResumenService) { }

  ngOnInit() {
    this.resumenService.load().then(
      resp => {
        this.data = resp;
        this.resumen = this.data.resumen;
      });
  }

  //No entiendo que se quiere hacer aquí
  pushCuenta() {
    //this.navCtrl.push('CuentaPage');
  }

}

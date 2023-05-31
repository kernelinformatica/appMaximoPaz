import { MiCuentaService } from './../../services/mi-cuenta.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.page.html',
  styleUrls: ['./mi-cuenta.page.scss'],
})


export class MiCuentaPage implements OnInit {
  public claveActual: string | undefined;
  public claveNueva: string | undefined;
  public claveRepetida : string | undefined;
  public errorMsg : string | undefined;
  public cuenta: any;
  public socio : any;
  istodoCargado = false;
  constructor(public miCuentaService: MiCuentaService,
    private route: ActivatedRoute,
    private uiService: UiService,
    private navController: NavController,
    private loadingController: LoadingController) { }

/**
  * Este metodo se ejecuta cuando el usuario presiona el botón iniciar
  */
public async cambiarClave() {
  await this.uiService.presentLoading();
  if (this.claveActual === null ) {
    // Muestro mensaje de error
    this.errorMsg = "Por favor ingrese la clave Actual";
    this.uiService.presentAlertInfo(this.errorMsg);


 } else if (this.claveNueva === null) {

   // Muestro mensaje de error
   this.errorMsg = "Por favor complete el campo clave nueva";
   this.uiService.presentAlertInfo(this.errorMsg);


 }  else if (this.claveRepetida === null) {

   // Muestro mensaje de error
  this.errorMsg = "Por favor complete el campo clave repetida";
   this.uiService.presentAlertInfo(this.errorMsg);

 } else if (this.claveNueva != this.claveRepetida ) {

   // Muestro mensaje de error

   this.errorMsg = "Las claves (Nueva y Repetida) deben ser iguales";
   this.uiService.presentAlertInfo(this.errorMsg);
 } else {

// todo good ejecto el metodo de cambio de clave

}

}




  ngOnInit() {
    const cuenta = this.route.snapshot.queryParamMap.get("cuenta");
    const socio = this.route.snapshot.queryParamMap.get("socio");
    debugger
    this.cuenta = cuenta;
    this.socio = socio;
    this.istodoCargado = true

  }

}

import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { ResumenService } from 'src/app/services/resumen.service';

import { CurrencyFormat} from 'src/app/pipes/currencyformat';
import { NumeroFormat } from 'src/app//pipes/numeroformat';
import { KilosFormat } from 'src/app//pipes/kilosformat';
@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit {
  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  private loader: any;                              // Usado para un mensaje de espere
  public mostrarDetalleCuentas = false;
  public mostrarDetalleFichaRemitos = false;
  public mostrarDetalleFichaCombustibles = false;                // Usado para ocultar el detalle de las cuentas
  public iconoCuentas = 'ios-add-circle-outline';  // Usado para mostrar el icono que corresponde
  public mostrarDetalleCereales = false;               // Usado para ocultar el detalle de los cereales
  public iconoCereales = 'ios-add-circle-outline';
  public iconoFichaRemitos = 'ios-add-circle-outline';
  public iconoFichaCombustibles = 'ios-add-circle-outline'; // Usado para mostrar el icono que corresponde
  public loginService: LoginService | any;
  public contieneRemitos: boolean | any;
  public contieneCombustibles: boolean | any;
  loadingCtrl: any;
  navCtrl: any;
  //---------------------------------------------//
  constructor(public resumenService: ResumenService) {

    // Me quedo con el servicio que recibi como parametro
    this.resumenService = resumenService;
    this.loginService = LoginService.getInstance();
    // Invoco el servicio para traerme el usuario
    this.resumenService.load();

    // Creo un mensaje de espere
    this.loader = this.loadingCtrl.create({
      content: "Por favor espere..."
    });

    // Muestro el mensaje de espere por favor
    this.loader.present();

  }
/**
  * Esta funcion se usa para saber si se puede renderizar la pagina o no
  */
public istodoCargado(): boolean {

  // Pregunto si ya se obtuvo una respuesta del serivicio
  if (this.resumenService.flag) {
    this.tieneCombustibles();
    this.tieneRemitos();
    // Oculto el loader
    this.loader.dismiss();

    // Devuelvo true para que renderice la vista
    return true;
  }

  // Devuelvo false para que no redenderice la vista
  return false;
}
/**
  * Este metodo se ejecuta cuando se selecciona una cuenta
  */
public ctacteTapped(event: any, item: any) {
  if(this.tieneFuncion("detalleCtaCte")){
    // Elias: cuando se cree esta pagina hay que habilitar el vínculo siguiente. (Dario)
    //this.navCtrl.push(DetalleCtaCtePage, { item: item });
    console.log(item);
  }
}

/**
  * Este metodo se ejecuta cuando se selecciona un cereal
  */
public cerealTapped(event: any, item: any) {
  if(this.tieneFuncion("detalleCereal")){
    // Elias: cuando se cree esta pagina hay que habilitar el vínculo siguiente. (Dario)
    //this.navCtrl.push(DetalleCerealPage, { item: item });
  }
}
  /**
  * Este metodo se utiliza para mostrar/ocultar el detalle de cereales
  */
  public toggleDetalleCereales() {
    if (this.mostrarDetalleCereales) {
      this.mostrarDetalleCereales = false;
      this.iconoCereales = 'ios-add-circle-outline';
    } else {
      this.mostrarDetalleCereales = true;
      this.iconoCereales = 'ios-remove-circle-outline';
    }
  }


/**
  * Este metodo se utiliza para mostrar/ocultar el detalle de las cta. cte.
  */
public toggleDetalleCuentas() {
  if (this.mostrarDetalleCuentas) {
    this.mostrarDetalleCuentas = false;
    this.iconoCuentas = 'ios-add-circle-outline';
  } else {
    this.mostrarDetalleCuentas = true;
    this.iconoCuentas = 'ios-remove-circle-outline';
  }
}




/**
* Este metodo devuelve el path al logo de la empresa
*/
public getLogoEmpresa() {
  return "http://www.gestagro.com.ar/clientes/movil/logos/" + this.resumenService.resumen.cuenta.id.substring(0, 2) + ".png";
}

public getFechaActualizacion(): string {
  return this.resumenService.resumen.fechaActualizacion;
}

public tieneFuncion(funcion : string) : boolean{
  return this.loginService.usuarioActual.funciones.tieneFuncion(funcion);
}
public tieneRemitos(){
  let element =  this.resumenService.resumen.fichaRemito;
  for (var i = 0, len = element.length; i < len; i++)
   if(element[i].idRubroCtacte.idRubroCtacte == 1 || element[i].idRubroCtacte.idRubroCtacte == 2 ){
     this.contieneRemitos = true;
     break;
   }  else {
     this.contieneRemitos = false;
   }
 }

public tieneCombustibles(){
  let element =  this.resumenService.resumen.fichaRemito;
  for (var i = 0, len = element.length; i < len; i++)
   if(element[i].idRubroCtacte.idRubroCtacte == 3){
     this.contieneCombustibles = true;
     break;
   }  else {
     this.contieneCombustibles = false;
   }
 }

 public ctacteActualTapped(event: any, item: any) {
  if(this.tieneFuncion("detalleCtaCte")){
    //this.navCtrl.push(DetalleCtaCtePage, { item: item });
  }
  }
  ngOnInit() {
  }

}

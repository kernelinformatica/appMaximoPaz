import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Configuraciones } from 'src/configuraciones/configuraciones';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.page.html',
  styleUrls: ['./acerca.page.scss'],
})
export class AcercaPage implements OnInit {
 // private loginService :  LoginService ;
  private version : string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.loginService = LoginService.getInstance();
    this.version = Configuraciones.version;
   }
   ionViewDidLoad() {
    console.log('ionViewDidLoad AcercaPage');
  }

  public getLogoEmpresa() : string {

    return "http://www.gestagro.com.ar/clientes/movil/logos/"/* + this..cuenta.id.substring(0,2) + ".png"*/ ;
  }

  public getVersionApp():string{
    return this.version;
  }

  public getVersionServicio() : string {
    return '1';
    // return this.loginService.versionServicio;
  }

  public getVersionLib():string{
    return '1'
    //return this.loginService.versionGestagro;
  }

  public openKernelPage():void{
    //const kernelBrowser = this.inAppBrowser.create("http://www.kernelinformatica.com.ar", "_system");
    //kernelBrowser.show();
  }
  ngOnInit() {
  }

}

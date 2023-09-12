import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private _alertCrontroller: AlertController,
    private _loadingController: LoadingController) { }


  async presentAlertInfo(message: string) {
   const alert = document.createElement('ion-alert');
   alert.header = 'Atención !!!';
   alert.message = message;
   alert.buttons = ['OK'];

   document.body.appendChild(alert);
   await alert.present();
  }


  async presentLoading(msg:string) {
    const loading = await this._loadingController.create({
      cssClass: 'my-custom-class',
      message: msg,
    });
    await loading.present();
  }
}

import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private _alertCrontroller: AlertController,
    private _loadingController: LoadingController) { }


  async presentAlertInfo(message: string) {
    const alert = await this._alertCrontroller.create({
      backdropDismiss: false,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


  async presentLoading() {
    const loading = await this._loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, espere...',
    });
    await loading.present();
  }
}

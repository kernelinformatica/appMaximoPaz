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
   alert.buttons =['Aceptar'];

   document.body.appendChild(alert);
   await alert.present();
  }






  async presentAlertConfirm(header: string, message: string, obj: any) {
    const alert = document.createElement('ion-alert');
    alert.header = header;
    alert.message = message;
    alert.buttons =obj;


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
  dissmisLoading() {

     this._loadingController.dismiss();
  }
  parseFecha(fecha: any) {

    const fechaDate = new Date(fecha);

    const fechaParseada =   (fechaDate.getUTCDate() < 10 ? ("0" + fechaDate.getUTCDate().toString()) : fechaDate.getUTCDate().toString())
                            + "/" +
                            (fechaDate.getUTCMonth()+1 < 10 ? ("0" + (fechaDate.getUTCMonth() + 1).toString()) : (fechaDate.getUTCMonth() + 1).toString())
                            + "/" +
                            (fechaDate.getUTCFullYear().toString().substr(0, 4)) ;





    return fechaParseada;
  }

}

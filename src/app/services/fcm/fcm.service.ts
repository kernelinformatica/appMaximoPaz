import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { BehaviorSubject } from 'rxjs';
import { Configuraciones } from 'src/configuraciones/configuraciones'
@Injectable({

  providedIn: 'root'
})
export class FcmService {
  private _redirect = new BehaviorSubject<any>(null);
  public usuarioActual: any;
  get redirect(){
    return this._redirect.asObservable();
  }
  constructor(

  ) { }


    initPush(){

      if(Capacitor.getPlatform() !== 'WEB'){
        this.registerPush();

      }

    }
    private async registerPush(){
      try {
        await this.addListeners();
        let permStatus = await PushNotifications.checkPermissions();
        if (permStatus.receive == 'prompt'){
          permStatus = await PushNotifications.requestPermissions();

        }
        if (permStatus.receive !== 'granted'){
          throw new Error ('Permiso denegado')

        }
        await PushNotifications.register();
      }catch(e){
        console.log(e)
      }
    }
async getDelivereNotifications(){
  const notificationsList = await PushNotifications.getDeliveredNotifications();
  console.log('Notificaciones Disponibles', notificationsList);
}


    addListeners = async () => {
      await PushNotifications.addListener('registration', async (token: any) => {
        console.info('Registration token: ', token.value);
        const fcm_token = (token?.value);
        let go = 1;
        const usuarioActualStr = localStorage.getItem('usuarioActual');
        if (usuarioActualStr) {
          this.usuarioActual = JSON.parse(usuarioActualStr);
        }
        const saved_token = JSON.parse( this.usuarioActual.token.hashId);
        if (saved_token){
          if(fcm_token == saved_token){
            go = 0;
          }else{
            go = 2
          }
        }
        if (go == 1 ){
          // save token
          localStorage.setItem("FCM_TOKEN", JSON.stringify(fcm_token))
        }else if (go == 2){
          // update token
          const data = {
            expired_token : saved_token,
            refreshed_token: fcm_token

          }
          localStorage.setItem("FCM_TOKEN", fcm_token)
        }

      });

      await PushNotifications.addListener('registrationError', err => {
        console.error('Registration error: ', err.error);
      });

      await PushNotifications.addListener('pushNotificationReceived', notification => {
        console.log('Push notification received: ', notification);
      });

      await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
        console.log('Push notification action performed', notification.actionId, notification.inputValue);
      });
    }

     registerNotifications = async () => {
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }

      await PushNotifications.register();
    }

     getDeliveredNotifications = async () => {
      const notificationList = await PushNotifications.getDeliveredNotifications();
      console.log('delivered notifications', notificationList);
    }


}

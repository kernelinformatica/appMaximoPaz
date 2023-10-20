import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { SolicitudFondosService } from 'src/app/services/solicitudfondos-service';

@Component({
  selector: 'app-pedidos-de-dinero',
  templateUrl: './pedidos-de-dinero.page.html',
  styleUrls: ['./pedidos-de-dinero.page.scss'],
})
export class PedidosDeDineroPage implements OnInit {

  constructor(public solicitudFondosService: SolicitudFondosService,
    public alertCtrl: AlertController,
    private router: Router,
    public loadingController : LoadingController) { }
    public pedidosPendientes : any[] = [];
    public cantidadPendiente: any = 0 ;
  ngOnInit() {

    this.cargarTransacciones();
  }
  cargarTransacciones(){
    this.solicitudFondosService.load().then(async (resp: any) => {
      const origen = resp.respuesta;
      this.pedidosPendientes = origen.filter((item : any) => item.idEstado.abreviatura == 'P');
      this.cantidadPendiente = this.pedidosPendientes.length

    })
  }

}

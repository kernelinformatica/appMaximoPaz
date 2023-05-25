import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DetalleCerealService } from 'src/app/services/detalle-cereal-service';
import { UiService } from 'src/app/services/ui.service';
import { DetalleCereal } from 'src/app/modelo/detallecereal';
import { MovimientoCereal } from 'src/app/modelo/movimientocereal';
@Component({
  selector: 'app-detalle-cereal',
  templateUrl: './detalle-cereal.page.html',
  styleUrls: ['./detalle-cereal.page.scss'],
})
export class DetalleCerealPage implements OnInit {
  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  private loader: any; // Usado para un mensaje de espere
  public cereal: any;   // Usado para ver los datos del cereal
  public cuenta: any;
  data: any;
  istodoCargado = false;
  public detalleCerealSocio: any;
  public detalleCereal: any;

  //---------------------------------------------//
  constructor(public navCtrl: NavController,

    public detallaCerealService: DetalleCerealService,
    private route: ActivatedRoute,
    private uiService: UiService,
    public loadingCtrl: LoadingController,
    private loadingController: LoadingController) {
  }
  /**
 * Esta funcion se usa para saber si se puede renderizar la pagina o no
 */
  public estatodoCargado(): boolean {

    // Pregunto si ya se obtuvo una respuesta del serivicio
    if (this.detallaCerealService.flag) {

      // Oculto el loader
      //this.loader.dismiss();

      // Devuelvo true para que renderice la vista
      return true;
    }

    // Devuelvo false para que no redenderice la vista
    return false;
  }
  async ngOnInit() {

    await this.uiService.presentLoading();

    const cereal = this.route.snapshot.queryParamMap.get("cereal");
    debugger
    if (cereal) {
      this.cereal = cereal;
    }
    if (this.cereal != null){
      this.detallaCerealService.load(this.cereal.cerealId, this.cereal.claseId, this.cereal.cosecha).then(
        async resp => {
          debugger
          this.data = resp;
          this.detalleCerealSocio = this.data.detalleCereal;
          this.detalleCereal = this.detalleCerealSocio
          this.istodoCargado = true;
          await this.loadingController.dismiss();

        });
      }else{
        await this.loadingController.dismiss();
        alert("Ocurrio un error general al traer la información de cereales "+this.cereal.cerealId)
    }

  }

  /**
   * Este metodo devuelve el importe del movimiento
   */
  public getImporteMovimiento(mov: MovimientoCereal): number {
    if (mov.kilosEntrada != 0) {
      return mov.kilosEntrada;
    } else if (mov.kilosSalida != 0) {
      return mov.kilosSalida;
    } else {
      return mov.kilosSaldo;
    }
  }
  public paginaRomaneos(item: any) {
    //this.navCtrl.push(DetalleRomaneosPage, { item: item });
  }
}







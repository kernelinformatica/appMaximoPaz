import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/pages/popover/popover.page';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss'],
})
export class HeaderComponent {

  @Input() headerText: string = "";
  @Input() numeroMensajes: number = 0;

  public cuenta: any;
  public texto: string = "";

  
  constructor(private route: ActivatedRoute,
              private navController: NavController,
              public popoverController: PopoverController) {
    const cuenta = this.route.snapshot.queryParamMap.get("cuenta");
    this.cuenta = cuenta;
  }

  //Esto no veo donde se usa
  public getLogoEmpresa(): string {
    return "http://www.gestagro.com.ar/clientes/movil/logos/" + this.cuenta.id.substring(0, 2) + ".png";
  }

  async presentPopover(e: Event) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: e,
    });

    await popover.present();
  }

  public verNotificaciones() {
    this.navController.navigateRoot('/notificaciones',
        {
          animated: true,
          queryParams: { cuenta: this.cuenta }
        });
  }

}

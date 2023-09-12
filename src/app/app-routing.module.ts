import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'mi-cuenta',
    loadChildren: () => import('./pages/mi-cuenta/mi-cuenta.module').then(m => m.MiCuentaPageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'resumen',
    loadChildren: () => import('./pages/resumen/resumen.module').then(m => m.ResumenPageModule)

  },
  {
    path: 'detalle-ctacte',
    loadChildren: () => import('./pages/detalle-ctacte/detalle-ctacte.module').then(m => m.DetalleCtactePageModule)
  },
  {
    path: 'detalle-cereal',
    loadChildren: () => import('./pages/detalle-cereal/detalle-cereal.module').then(m => m.DetalleCerealPageModule)
  },
  {
    path: 'acerca',
    loadChildren: () => import('./pages/acerca/acerca.module').then(m => m.AcercaPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./pages/notificaciones/notificaciones.module').then(m => m.NotificacionesPageModule)
  },
  {
    path: 'popover',
    loadChildren: () => import('./pages/popover/popover.module').then( m => m.PopoverPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'mercado-cereales',
    loadChildren: () => import('./pages/mercado-cereales/mercado-cereales.module').then( m => m.MercadoCerealesPageModule)
  },
  {
    path: 'politica',
    loadChildren: () => import('./pages/info/politica/politica.module').then( m => m.PoliticaPageModule)
  },
  {
    path: 'terminos-condiciones',
    loadChildren: () => import('./pages/info/terminos-condiciones/terminos-condiciones.module').then( m => m.TerminosCondicionesPageModule)
  },
  {
    path: 'legales',
    loadChildren: () => import('./pages/info/legales/legales.module').then( m => m.LegalesPageModule)
  },
  {
    path: 'como-llegar',
    loadChildren: () => import('./pages/info/como-llegar/como-llegar.module').then( m => m.ComoLlegarPageModule)
  },


  {
    path: 'ordenes-de-venta',
    loadChildren: () => import('./pages/ordenes-de-venta/ordenes-de-venta.module').then( m => m.OrdenesDeVentaPageModule)
  },  {
    path: 'pedidos-de-dinero',
    loadChildren: () => import('./pages/pedidos-de-dinero/pedidos-de-dinero.module').then( m => m.PedidosDeDineroPageModule)
  },














];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

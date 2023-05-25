import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'resumen',
    loadChildren: () => import('./pages/resumen/resumen.module').then( m => m.ResumenPageModule)
  },
  {
    path: 'detalle-ctacte',
    loadChildren: () => import('./pages/detalle-ctacte/detalle-ctacte.module').then( m => m.DetalleCtactePageModule)
  },
  {
    path: 'detalle-cereal',
    loadChildren: () => import('./pages/detalle-cereal/detalle-cereal.module').then( m => m.DetalleCerealPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

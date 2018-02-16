import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { RouterModule, Routes } from '@angular/router';
import { HaEntradaComponent } from '../hamacas/ha-entrada/ha-entrada.component';
import { HamacasModule } from '../hamacas/hamacas.module';
import { HaDetalleComponent } from '../hamacas/ha-detalle/ha-detalle.component';
import { HaListaComponent } from '../hamacas/ha-lista/ha-lista.component';
import { InfoComponent } from './info/info.component';
import { InicioComponent } from './inicio/inicio.component';
import { HaRotasComponent } from '../hamacas/ha-rotas/ha-rotas.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'entrada', component: HaEntradaComponent },
  { path: 'detalle', component: HaDetalleComponent },
  { path: 'detalle/:id', component: HaDetalleComponent },
  { path: 'lista', component: HaListaComponent },
  { path: 'rotas', component: HaRotasComponent },
  { path: 'info', component: InfoComponent }
];


@NgModule({
  imports: [
    CommonModule,
    HamacasModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [CoreComponent, InfoComponent, InicioComponent]
})
export class CoreModule { }

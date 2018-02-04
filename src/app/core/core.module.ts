import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { RouterModule, Routes } from '@angular/router';
import { HaEntradaComponent } from '../hamacas/ha-entrada/ha-entrada.component';
import { HamacasModule } from '../hamacas/hamacas.module';
import { HaDetalleComponent } from '../hamacas/ha-detalle/ha-detalle.component';

const routes: Routes = [
  { path: '', component: HaEntradaComponent },
  { path: 'detalle', component: HaDetalleComponent },
  { path: 'detalle/:id', component: HaDetalleComponent },
];


@NgModule({
  imports: [
    CommonModule,
    HamacasModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [CoreComponent]
})
export class CoreModule { }

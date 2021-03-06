import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HaEntradaComponent } from './ha-entrada/ha-entrada.component';
import { HaDetalleComponent } from './ha-detalle/ha-detalle.component';
import { HaListaComponent } from './ha-lista/ha-lista.component';
import { Global } from '../shared/global.services';
import { HamacasService } from '../shared/hamacas.service';
import { HttpClientModule } from '@angular/common/http';
import { BdService } from '../shared/bd.services';
import { RouterModule } from '@angular/router';
import { HaRotasComponent } from './ha-rotas/ha-rotas.component';
import { HaLocalizaComponent } from './ha-localiza/ha-localiza.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    HaEntradaComponent,
    HaDetalleComponent,
    HaListaComponent,
    HaRotasComponent,
    HaLocalizaComponent
  ],
  providers: [
    Global,
    BdService,
    HamacasService
  ]
})
export class HamacasModule { }

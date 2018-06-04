import { Component, OnInit } from '@angular/core';
import { Global } from '../../shared/global.services';
import { HamacasService } from '../../shared/hamacas.service';
import { Router } from '@angular/router';
import { Acumulados } from '../../shared/models';

@Component({
  selector: 'app-ha-rotas',
  templateUrl: './ha-rotas.component.html',
  styleUrls: ['./ha-rotas.component.css']
})
export class HaRotasComponent implements OnInit {

  public fecha: string;
  public sector: number;
  public acumuladosMes: Acumulados;
  public acumuladosAno: Acumulados;
  private ano: string;
  private mes: string;
  public sectorMes: Acumulados;
  public sectorAno: Acumulados;

  constructor(private global: Global, private hamacasService: HamacasService) { }

  ngOnInit() {
    this.fecha = this.global.fecha;
    this.sector = this.global.sector;

    this.mesAno(this.fecha);
    this.hamacasService.cargaAcumulados(this.mes, this.ano);

/*     window.location.hash = 'no-back-button';
    window.location.hash = 'Again-No-back-button'; // chrome
    window.onhashchange = function() {
      window.location.hash = 'no-back-button';
    }; */

  }

  masSector() {
    if (this.sector < 22) {
      this.sector++;
      this.global.setSector(this.sector);
    }
  }

  menosSector() {
    if (this.sector > 1) {
      this.sector--;
      this.global.setSector(this.sector);
    }
  }

  mesAno(fecha: string) {
    const splitFecha = fecha.split('-');

    this.ano = splitFecha[0];
    this.mes = splitFecha[1];
  }

  existeRotaMes(sector: number, ) {
    this.sectorMes = this.hamacasService.acumuladosMes.find(x => x._id === sector);

    if (this.sectorMes) {
      return this.sectorMes;
    }
  }

  existeRotaAno(sector: number) {
    this.sectorAno = this.hamacasService.acumuladosAno.find(x => x._id === sector);

    if (this.sectorAno) {
      return this.sectorAno;
    }
  }

  actualizaFecha() {
    this.mesAno(this.fecha);
    this.hamacasService.cargaAcumulados(this.mes, this.ano);
  }

}

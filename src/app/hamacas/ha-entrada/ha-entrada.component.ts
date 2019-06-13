import { Component, OnInit } from '@angular/core';
import { Global } from '../../shared/global.services';
import { HamacasService } from '../../shared/hamacas.service';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-ha-entrada',
  templateUrl: './ha-entrada.component.html',
  styleUrls: ['./ha-entrada.component.css']
})
export class HaEntradaComponent implements OnInit {
  public fecha: string;
  public sector: number;
  public sectorDia: any;
  public sectorUlt: any;
  public sectorMax: any;

  public verSector = false;

  public defHamacas: number;
  public defSombrillas: number;

  public classCard = 'bg-success';

  constructor(
    private global: Global,
    private hamacasService: HamacasService,
    private router: Router,
    private swUpdate: SwUpdate
  ) {}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('Hay una nueva version. Actualizar?')) {
          window.location.reload();
        }
      });
    }

    /*     window.location.hash = 'no-back-button';
    window.location.hash = 'Again-No-back-button'; // chrome
    window.onhashchange = function() {
      window.location.hash = 'no-back-button';
    }; */

    this.fecha = this.global.fecha;
    this.sector = this.global.sector;

    this.hamacasService.cargaUltimos(this.fecha);

    const mes = this.fecha.split('-');

    this.hamacasService.cargaMaximos(mes[1]);
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

  existeUlt(sector: number) {
    this.sectorUlt = this.hamacasService.hamacasUltimo.find(
      x => x._id === sector
    );

    if (this.sectorUlt) {
      return this.sectorUlt;
    }
  }

  existeUltFecha(sector: number) {
    this.sectorDia = this.hamacasService.hamacasUltimoFecha.find(
      x => x._id === sector
    );

    if (this.sectorDia) {
      return this.sectorDia;
    }
  }

  checkMax(sector: number) {
    this.sectorMax = this.hamacasService.maximo.find(x => x._id === sector);

    this.existeUlt(sector);

    if (this.sectorUlt && this.sectorMax) {
      this.defHamacas = this.sectorMax.maxHamacas - this.sectorUlt.lastHamacas;
      this.defSombrillas =
        this.sectorMax.maxSombrillas - this.sectorUlt.lastSombrillas;
    }

    if (this.defHamacas < 0 || this.defSombrillas < 0) {
      this.classCard = 'card text-white mb-3 bg-danger';
    } else {
      this.classCard = 'card text-black mb-3 bg-success';
    }

    if (this.sectorMax) {
      return this.sectorMax;
    }
  }

  nuevo() {
    this.router.navigate(['/detalle']);
  }

  actualizaFecha() {
    this.hamacasService.cargaUltimos(this.fecha);
  }
}

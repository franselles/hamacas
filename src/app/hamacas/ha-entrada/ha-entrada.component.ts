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

  constructor(private global: Global, private hamacasService: HamacasService, private router: Router, private swUpdate: SwUpdate) { }

  ngOnInit() {

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
          if (confirm('Hay una nueva version. Actualizar?')) {
              window.location.reload();
          }
      });
    }

    this.fecha = this.global.fecha;
    this.sector = this.global.sector;

    this.hamacasService.cargaUltimos(this.fecha);

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
    this.sectorUlt = this.hamacasService.hamacasUltimo.find(x => x._id === sector);

    if (this.sectorUlt) {
      return this.sectorUlt;
    }
  }

  existeUltFecha(sector: number) {
    this.sectorDia = this.hamacasService.hamacasUltimoFecha.find(x => x._id === sector);

    if (this.sectorDia) {
      return this.sectorDia;
    }
  }

  nuevo() {
    this.router.navigate(['/detalle']);
  }

}

import { Component, OnInit } from '@angular/core';
import { HamacasService } from '../../shared/hamacas.service';
import { Localizaciones } from '../../shared/models';

@Component({
  selector: 'app-ha-localiza',
  templateUrl: './ha-localiza.component.html',
  styleUrls: ['./ha-localiza.component.css']
})
export class HaLocalizaComponent implements OnInit {

  public sector = 1;
  public localizacion: Localizaciones;

  constructor(private hamacasService: HamacasService) { }

  ngOnInit() {
    this.hamacasService.cargaLocalizaciones();

/*     window.location.hash = 'no-back-button';
    window.location.hash = 'Again-No-back-button'; // chrome
    window.onhashchange = function() {
      window.location.hash = 'no-back-button';
    }; */

  }

  masSector() {
    if (this.sector < 22) {
      this.sector++;
    }
  }

  menosSector() {
    if (this.sector > 1) {
      this.sector--;
    }
  }

  existeLocalizacion(sector: number) {

    this.localizacion = this.hamacasService.localizaciones.find(x => x.sector === sector);

    if (this.localizacion) {
      return this.localizacion;
    }
  }

}

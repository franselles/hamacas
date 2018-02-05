import { Component, OnInit } from '@angular/core';
import { HamacasService } from '../../shared/hamacas.service';

@Component({
  selector: 'app-ha-lista',
  templateUrl: './ha-lista.component.html',
  styleUrls: ['./ha-lista.component.css']
})
export class HaListaComponent implements OnInit {

  public sectorUlt: any[] = [];

  constructor(private hamacasService: HamacasService) { }

  ngOnInit() {
    window.location.hash = 'no-back-button';
    window.location.hash = 'Again-No-back-button'; // chrome
    window.onhashchange = function() {
      window.location.hash = 'no-back-button';
    };

    this.sectorUlt = this.hamacasService.hamacasUltimo;
  }

}

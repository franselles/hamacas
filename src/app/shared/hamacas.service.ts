import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BdService } from './../shared/bd.services';
import { Hamaca } from './models';

@Injectable()
export class HamacasService {

  public hamacasUltimo: any[] = [];
  public hamacasUltimoFecha: any[] = [];

  BASE_URL: string;

  constructor(private http: HttpClient, private bdService: BdService) {
    this.BASE_URL = this.bdService.dir_bd_ + 'hamacas/';
  }

  getHamacasUltimos() {
    return this.http.get(this.BASE_URL + 'lista/ultimos');
  }

  getHamacasUltimosFecha(fecha: string) {
    return this.http.get(this.BASE_URL + 'lista/ultimos/fecha/' + fecha);
  }

  getHamaca(id: string | number) {
    return this.http.get(this.BASE_URL + 'edita/' + id);
  }

  addHamaca(hamaca: Hamaca) {
    return this.http.post(this.BASE_URL, hamaca);
  }

  removeHamaca(id: number | string) {
    return this.http.delete(this.BASE_URL + id);
  }

  updateHamaca(id: string | number, hamaca: Hamaca) {
    return this.http.put(this.BASE_URL + id, hamaca);
  }

  cargaUltimos(fecha: string) {
    this.getHamacasUltimos().subscribe(
      (data: any[]) => {
        this.hamacasUltimo = data;
      },
      err => console.log(err)
    );

    this.getHamacasUltimosFecha(fecha).subscribe(
      (data: any[]) => {
        this.hamacasUltimoFecha = data;
      },
      err => console.log(err)
    );
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BdService } from './../shared/bd.services';
import { Hamaca, Acumulados, Localizaciones, Maxhamaca } from './models';

@Injectable()
export class HamacasService {

  public hamacasUltimo: any[] = [];
  public hamacasUltimoFecha: any[] = [];

  public acumuladosMes: Acumulados[] = [];
  public acumuladosAno: Acumulados[] = [];

  public localizaciones: Localizaciones[] = [];

  public maximo: any[] = [];

  BASE_URL: string;
  BASE_URL_LOC: string;

  constructor(private http: HttpClient, private bdService: BdService) {
    this.BASE_URL = this.bdService.dir_bd_ + 'hamacas/';
    this.BASE_URL_LOC = this.bdService.dir_bd_ + 'localizacion';
  }


  getMaximo(mes: string) {
    return this.http.get(this.BASE_URL + 'maximo/' + mes);
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

  getAcumuladosMes(month: string, year: string) {
    return this.http.get(this.BASE_URL + 'rotas/total/mes/' + month + '/' + year);
  }

  getAcumuladosAno(year: string) {
    return this.http.get(this.BASE_URL + 'rotas/total/ano/' + year);
  }

  getLocalizaciones() {
    return this.http.get(this.BASE_URL_LOC);
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

  cargaAcumulados(mes: string, ano: string) {
    this.getAcumuladosMes(mes, ano).subscribe(
      (data: Acumulados[]) => {
        this.acumuladosMes = data;
      },
      err => console.log(err)
    );

    this.getAcumuladosAno(ano).subscribe(
      (data: Acumulados[]) => {
        this.acumuladosAno = data;
      },
      err => console.log(err)
    );
  }

  cargaMaximos(mes: string) {
    this.getMaximo(mes).subscribe(
      (data: any[]) => {
        this.maximo = data;
      },
      err => console.log(err)
    );
  }

  cargaLocalizaciones() {
    this.getLocalizaciones().subscribe(
      (data: Localizaciones[]) => {
        this.localizaciones = data;
      },
      err => console.log(err)
    );
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BdService } from './../shared/bd.services';
import { Hamaca, Acumulados } from './models';

@Injectable()
export class HamacasService {

  public hamacasUltimo: any[] = [];
  public hamacasUltimoFecha: any[] = [];

  public acumuladosMes: Acumulados[] = [];
  public acumuladosAno: Acumulados[] = [];

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

  getAcumuladosMes(month: string, year: string) {
    return this.http.get(this.BASE_URL + 'rotas/total/mes/' + month + '/' + year);
  }

  getAcumuladosAno(year: string) {
    return this.http.get(this.BASE_URL + 'rotas/total/ano/' + year);
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

}

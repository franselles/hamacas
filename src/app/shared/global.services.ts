import { Injectable } from '@angular/core';

@Injectable()
export class Global {

    public fecha: string;
    public mes: string;
    public ano: number;
    public dia: string;
    public sector: number;

    constructor() {
        const date = new Date();
        this.dia = (date.getDate() < 10 ? '0' : '') + date.getDate();
        this.mes = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        this.ano = date.getFullYear();
        this.fecha = this.ano + '-' + this.mes + '-' + this.dia;
        this.sector = 1;
    }

    setGlobals(mes: string, ano: number) {
        this.mes = mes;
        this.ano = ano;
    }

    setFecha(fecha: string) {
        this.fecha = fecha;
    }

    setSector(sector: number) {
        this.sector = sector;
    }
}

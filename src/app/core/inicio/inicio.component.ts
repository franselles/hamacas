import { Component, OnInit } from '@angular/core';
import { HamacasService } from '../../shared/hamacas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public mensaje: string;

  constructor(private router: Router, private hamacasService: HamacasService) {}

  ngOnInit() {
    this.conexion();
  }

  conexion() {
    this.hamacasService.getHamacasUltimos().subscribe(
      () => {
        this.router.navigate(['/entrada']);
      },
      () => {
        // this.router.navigate(['/']);
        this.mensaje = 'reintentando';
        this.conexion();
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hamaca } from '../../shared/models';
import { Router, ActivatedRoute } from '@angular/router';
import { HamacasService } from '../../shared/hamacas.service';
import { Global } from '../../shared/global.services';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ha-detalle',
  templateUrl: './ha-detalle.component.html',
  styleUrls: ['./ha-detalle.component.css']
})
export class HaDetalleComponent implements OnInit {

  public hamacasForm: FormGroup;
  public hamaca: Hamaca;
  public enEdicion: boolean;
  private id: string;
  private sectorUlt: any;
  public sSector: number;
  public desHamacas = true;
  public desSombrillas = true;
  public verBorrar = false;
  // private numHamacas: number;
  // private numSombrillas: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder,
    private hamacasService: HamacasService, private global: Global, private location: Location) { }

  ngOnInit() {
    window.location.hash = 'no-back-button';
    window.location.hash = 'Again-No-back-button'; // chrome
    window.onhashchange = function() {
      window.location.hash = 'no-back-button';
    };

    this.hamacasForm = this.fb.group({
      sector: ['', Validators.required],
      fecha: ['', Validators.required],
      hamacas: ['0'],
      sombrillas: ['0'],
      h_rotas: ['0'],
      h_retiradas: ['0'],
      h_repuestas: ['0'],
      s_rotas: ['0'],
      s_retiradas: ['0'],
      s_repuestas: ['0'],
      observacion: ['']
    });

    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.hamacasService.getHamaca(this.id)
        .subscribe((data: Hamaca) => {
            this.hamaca = data;
            this.enEdicion = true;
            this.cargaFormulario(data);
            this.sSector = this.global.sector;
            // this.numHamacas = this.hamaca.hamacas;
            // this.numSombrillas = this.hamaca.sombrillas;
          },
          err => console.log(err));
    } else {
      this.enEdicion = false;
      this.sSector = this.global.sector;
      this.hamacasForm.patchValue({
        sector: this.global.sector,
        fecha: this.global.fecha
      });

      this.sectorUlt = this.hamacasService.hamacasUltimo.find(x => x._id === this.global.sector);

      if (this.sectorUlt) {
        console.log('last');
        // this.numHamacas = this.sectorUlt.lastHamacas;
        // this.numSombrillas = this.sectorUlt.lastSombrillas;
        this.hamacasForm.patchValue({
          hamacas: this.sectorUlt.lastHamacas,
          sombrillas: this.sectorUlt.lastSombrillas
        });
      }
    }
  }

  cargaFormulario(data: Hamaca) {
    this.hamacasForm.patchValue({
      sector: data.sector,
      fecha: data.fecha,
      hamacas: data.hamacas,
      sombrillas: data.sombrillas,
      h_rotas: data.h_rotas,
      h_retiradas: data.h_retiradas,
      h_repuestas: data.h_repuestas,
      s_rotas: data.s_rotas,
      s_retiradas: data.s_retiradas,
      s_repuestas: data.s_repuestas,
      observacion: data.observacion
    });
  }

  /*
   // GESTION DE onSubmit
   */

  onSubmit(data: any) {
    if (this.enEdicion === true) {
      this.hamacasService.updateHamaca(this.id, data.value)
        .subscribe(() => {
          console.log('Actializado');
          this.router.navigate(['/entrada']);
          // this.location.back();
        }, err => console.log('Error updating : ' + err));
    } else {
      this.hamacasService.addHamaca(data.value)
        .subscribe(() => {
          console.log('Creado');
          this.router.navigate(['/entrada']);
          // this.location.back();
        }, err => console.log('Error creating : ' + err));
    }
  }


  /*
   GESTION Cancelar
   */

  onCancelar() {
    this.router.navigate(['/entrada']);
    // this.location.back();
  }

  /*
   GESTION Borrar
   */


  onBorrar(datos: any) {
    if (this.enEdicion) {
      this.hamacasService.removeHamaca(this.id).subscribe(() => {
        console.log('Borrado');
        // this.router.navigate(['/']);
        this.hamacasService.cargaUltimos(this.global.fecha);
        this.router.navigate(['/entrada']);
        // this.location.back();
      }, error => console.error('Error removing : ' + error));
    }
  }

  masHret(value: any, n: number) {
    const t = Number(value.h_retiradas);
    const h = Number(value.hamacas);
    this.hamacasForm.patchValue({
      hamacas: h - n,
      h_retiradas: t + n
    });
  }

  menosHret(value: any, n: number) {
    const t = Number(value.h_retiradas);
    const h = Number(value.hamacas);
    if (t > 0) {
      this.hamacasForm.patchValue({
        hamacas: h + n,
        h_retiradas: t - n
      });
    }
  }

  masSret(value: any, n: number) {
    const t = Number(value.s_retiradas);
    const h = Number(value.sombrillas);
    this.hamacasForm.patchValue({
      sombrillas: h - n,
      s_retiradas: t + n
    });
  }

  menosSret(value: any, n: number) {
    const t = Number(value.s_retiradas);
    const h = Number(value.sombrillas);
    if (t > 0) {
      this.hamacasForm.patchValue({
        sombrillas: h + n,
        s_retiradas: t - n
      });
    }
  }

  masHrot(value: any, n: number) {
    const t = Number(value.h_rotas);
    const h = Number(value.hamacas);
    this.hamacasForm.patchValue({
      hamacas: h - n,
      h_rotas: t + n
    });
  }

  menosHrot(value: any, n: number) {
    const t = Number(value.h_rotas);
    const h = Number(value.hamacas);
    if (t > 0) {
      this.hamacasForm.patchValue({
        hamacas: h + n,
        h_rotas: t - n
      });
    }
  }

  masSrot(value: any, n: number) {
    const t = Number(value.s_rotas);
    const h = Number(value.sombrillas);
    this.hamacasForm.patchValue({
      sombrillas: h - n,
      s_rotas: t + n
    });
  }

  menosSrot(value: any, n: number) {
    const t = Number(value.s_rotas);
    const h = Number(value.sombrillas);
    if (t > 0) {
      this.hamacasForm.patchValue({
        sombrillas: h + n,
        s_rotas: t - n
      });
    }
  }

  masHrep(value: any, n: number) {
    const t = Number(value.h_repuestas);
    const h = Number(value.hamacas);
    this.hamacasForm.patchValue({
      hamacas: h + n,
      h_repuestas: t + n
    });
  }

  menosHrep(value: any, n: number) {
    const t = Number(value.h_repuestas);
    const h = Number(value.hamacas);
    if (t > 0) {
      this.hamacasForm.patchValue({
        hamacas: h - n,
        h_repuestas: t - n
      });
    }
  }

  masSrep(value: any, n: number) {
    const t = Number(value.s_repuestas);
    const h = Number(value.sombrillas);
    this.hamacasForm.patchValue({
      sombrillas: h + n,
      s_repuestas: t + n
    });
  }

  menosSrep(value: any, n: number) {
    const t = Number(value.s_repuestas);
    const h = Number(value.sombrillas);
    if (t > 0) {
      this.hamacasForm.patchValue({
        sombrillas: h - n,
        s_repuestas: t - n
      });
    }
  }

/*   cambiaHamacas(value: any) {
    console.log(this.numHamacas);
    if (Number.isNaN(value.h_retiradas) === false) {
    const t = Number(value.h_retiradas);
    if (t > 0) {
      this.hamacasForm.patchValue({
        hamacas: this.numHamacas - t,
      });
    }
    }
  } */
}

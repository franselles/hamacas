import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaDetalleComponent } from './ha-detalle.component';

describe('HaDetalleComponent', () => {
  let component: HaDetalleComponent;
  let fixture: ComponentFixture<HaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

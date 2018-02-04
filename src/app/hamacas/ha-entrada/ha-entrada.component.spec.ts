import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaEntradaComponent } from './ha-entrada.component';

describe('HaEntradaComponent', () => {
  let component: HaEntradaComponent;
  let fixture: ComponentFixture<HaEntradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaEntradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

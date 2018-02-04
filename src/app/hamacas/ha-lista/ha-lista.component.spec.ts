import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaListaComponent } from './ha-lista.component';

describe('HaListaComponent', () => {
  let component: HaListaComponent;
  let fixture: ComponentFixture<HaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

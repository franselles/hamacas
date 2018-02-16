import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaRotasComponent } from './ha-rotas.component';

describe('HaRotasComponent', () => {
  let component: HaRotasComponent;
  let fixture: ComponentFixture<HaRotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaRotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaRotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

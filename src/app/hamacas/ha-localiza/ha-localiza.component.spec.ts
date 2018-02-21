import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaLocalizaComponent } from './ha-localiza.component';

describe('HaLocalizaComponent', () => {
  let component: HaLocalizaComponent;
  let fixture: ComponentFixture<HaLocalizaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaLocalizaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaLocalizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

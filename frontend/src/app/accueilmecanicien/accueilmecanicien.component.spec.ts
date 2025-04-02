import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilatelierComponent } from './accueilmecanicien.component';

describe('AcceuilatelierComponent', () => {
  let component: AcceuilatelierComponent;
  let fixture: ComponentFixture<AcceuilatelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceuilatelierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceuilatelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

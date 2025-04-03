import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotvoitureComponent } from './depotvoiture.component';

describe('DepotvoitureComponent', () => {
  let component: DepotvoitureComponent;
  let fixture: ComponentFixture<DepotvoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepotvoitureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepotvoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

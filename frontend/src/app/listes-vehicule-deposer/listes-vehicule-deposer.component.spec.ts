import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesVehiculeDeposerComponent } from './listes-vehicule-deposer.component';

describe('ListesVehiculeDeposerComponent', () => {
  let component: ListesVehiculeDeposerComponent;
  let fixture: ComponentFixture<ListesVehiculeDeposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListesVehiculeDeposerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListesVehiculeDeposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

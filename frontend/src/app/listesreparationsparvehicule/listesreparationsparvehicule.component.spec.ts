import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesreparationsparvehiculeComponent } from './listesreparationsparvehicule.component';

describe('ListesreparationsparvehiculeComponent', () => {
  let component: ListesreparationsparvehiculeComponent;
  let fixture: ComponentFixture<ListesreparationsparvehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListesreparationsparvehiculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListesreparationsparvehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

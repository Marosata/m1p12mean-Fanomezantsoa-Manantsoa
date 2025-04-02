import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesvehiculesComponent } from './listesvehicules.component';

describe('ListesvehiculesComponent', () => {
  let component: ListesvehiculesComponent;
  let fixture: ComponentFixture<ListesvehiculesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListesvehiculesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListesvehiculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

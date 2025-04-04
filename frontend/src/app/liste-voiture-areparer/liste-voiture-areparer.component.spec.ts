import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeVoitureAreparerComponent } from './liste-voiture-areparer.component';

describe('ListeVoitureAreparerComponent', () => {
  let component: ListeVoitureAreparerComponent;
  let fixture: ComponentFixture<ListeVoitureAreparerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeVoitureAreparerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeVoitureAreparerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

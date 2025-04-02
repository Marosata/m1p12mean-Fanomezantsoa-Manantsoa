import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesvehiculesbondesortievaliderComponent } from './listesvehiculesbondesortievalider.component';

describe('ListesvehiculesbondesortievaliderComponent', () => {
  let component: ListesvehiculesbondesortievaliderComponent;
  let fixture: ComponentFixture<ListesvehiculesbondesortievaliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListesvehiculesbondesortievaliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListesvehiculesbondesortievaliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

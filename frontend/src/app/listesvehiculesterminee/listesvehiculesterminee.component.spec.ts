import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesvehiculestermineeComponent } from './listesvehiculesterminee.component';

describe('ListesvehiculestermineeComponent', () => {
  let component: ListesvehiculestermineeComponent;
  let fixture: ComponentFixture<ListesvehiculestermineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListesvehiculestermineeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListesvehiculestermineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

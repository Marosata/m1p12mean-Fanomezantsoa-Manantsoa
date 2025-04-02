import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesreparationsattenteComponent } from './listesreparationsattente.component';

describe('ListesreparationsattenteComponent', () => {
  let component: ListesreparationsattenteComponent;
  let fixture: ComponentFixture<ListesreparationsattenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListesreparationsattenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListesreparationsattenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

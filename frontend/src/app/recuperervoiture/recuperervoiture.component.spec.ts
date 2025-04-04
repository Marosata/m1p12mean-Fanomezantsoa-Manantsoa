import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperervoitureComponent } from './recuperervoiture.component';

describe('RecuperervoitureComponent', () => {
  let component: RecuperervoitureComponent;
  let fixture: ComponentFixture<RecuperervoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperervoitureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperervoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

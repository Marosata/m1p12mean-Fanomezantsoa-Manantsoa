import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquesreparationComponent } from './historiquesreparation.component';

describe('HistoriquesreparationComponent', () => {
  let component: HistoriquesreparationComponent;
  let fixture: ComponentFixture<HistoriquesreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriquesreparationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriquesreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

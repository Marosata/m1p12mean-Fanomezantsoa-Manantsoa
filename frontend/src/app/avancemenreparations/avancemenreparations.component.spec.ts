import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvancemenreparationsComponent } from './avancemenreparations.component';

describe('AvancemenreparationsComponent', () => {
  let component: AvancemenreparationsComponent;
  let fixture: ComponentFixture<AvancemenreparationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvancemenreparationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvancemenreparationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculereparationpayerComponent } from './vehiculereparationpayer.component';

describe('VehiculereparationpayerComponent', () => {
  let component: VehiculereparationpayerComponent;
  let fixture: ComponentFixture<VehiculereparationpayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculereparationpayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculereparationpayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

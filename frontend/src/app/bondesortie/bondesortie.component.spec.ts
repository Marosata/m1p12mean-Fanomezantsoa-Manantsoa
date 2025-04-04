import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondesortieComponent } from './bondesortie.component';

describe('BondesortieComponent', () => {
  let component: BondesortieComponent;
  let fixture: ComponentFixture<BondesortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BondesortieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BondesortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoyeMailComponent } from './envoye-mail.component';

describe('EnvoyeMailComponent', () => {
  let component: EnvoyeMailComponent;
  let fixture: ComponentFixture<EnvoyeMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvoyeMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvoyeMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

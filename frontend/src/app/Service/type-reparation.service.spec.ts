import { TestBed } from '@angular/core/testing';

import { TypeReparationService } from './type-reparation.service';

describe('TypeReparationService', () => {
  let service: TypeReparationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeReparationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

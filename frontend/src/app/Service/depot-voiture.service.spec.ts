import { TestBed } from '@angular/core/testing';

import { DepotVoitureService } from './depot-voiture.service';

describe('DepotVoitureService', () => {
  let service: DepotVoitureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepotVoitureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

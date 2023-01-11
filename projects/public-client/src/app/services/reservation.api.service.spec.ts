import { TestBed } from '@angular/core/testing';

import { ReservationApiService } from './reservation.api.service';

describe('ReservationApiService', () => {
  let service: ReservationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

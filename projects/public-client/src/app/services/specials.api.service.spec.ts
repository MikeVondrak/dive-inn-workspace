import { TestBed } from '@angular/core/testing';

import { SpecialsApiService } from './specials.api.service';

describe('SpecialsApiService', () => {
  let service: SpecialsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

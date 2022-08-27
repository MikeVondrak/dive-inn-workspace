import { TestBed } from '@angular/core/testing';

import { DiveInnLibService } from './dive-inn-lib.service';

describe('DiveInnLibService', () => {
  let service: DiveInnLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiveInnLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

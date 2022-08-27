import { TestBed } from '@angular/core/testing';

import { AnimateViewportOverlayService } from './animate-viewport-overlay.service';

describe('AnimateViewportOverlayService', () => {
  let service: AnimateViewportOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimateViewportOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

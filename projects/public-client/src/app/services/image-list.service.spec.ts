import { TestBed } from '@angular/core/testing';

import { ImageListService } from './image-list.service';

describe('ImageListService', () => {
  let service: ImageListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

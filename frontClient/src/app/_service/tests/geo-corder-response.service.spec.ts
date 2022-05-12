import { TestBed } from '@angular/core/testing';

import { GeoCorderResponseService } from './geo-corder-response.service';

describe('GeoCorderResponseService', () => {
  let service: GeoCorderResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoCorderResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

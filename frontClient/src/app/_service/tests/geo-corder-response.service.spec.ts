import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GeoCorderResponseService } from '../geo-corder-response.service';

describe('GeoCorderResponseService', () => {
  let service: GeoCorderResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[GeoCorderResponseService]
    });
    service = TestBed.inject(GeoCorderResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

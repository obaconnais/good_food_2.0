import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GeoCorderResponseService } from '../geo-corder-response.service';
import { Icon } from 'leaflet';
import { ICountry } from 'src/app/_interface/country';

describe('GeoCorderResponseService', () => {
  let service: GeoCorderResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GeoCorderResponseService]
    });
    service = TestBed.inject(GeoCorderResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of countries', () => {
    let array:ICountry[] = service.getCountries()
    expect(array).toEqual(service.constryCode)
  })

});

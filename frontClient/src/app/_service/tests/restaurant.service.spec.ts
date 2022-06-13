import { TestBed, inject } from '@angular/core/testing';
import { RestaurantService } from '../restaurant.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RestaurantService', () => {
  let service: RestaurantService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[RestaurantService]
    });
    service = TestBed.inject(RestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});

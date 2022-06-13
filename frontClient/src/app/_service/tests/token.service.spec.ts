import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TokenService } from '../token.service';

describe('TokenService', () => {
  let service: TokenService;
  let router:Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes([])],
    });
    service = TestBed.inject(TokenService);
    router = TestBed.inject(Router)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

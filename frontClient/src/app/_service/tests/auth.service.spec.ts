import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,
      RouterTestingModule.withRoutes([])],
      providers:[AuthService]
    });
    service = TestBed.inject(AuthService);
    const activatedRoute = TestBed.inject(ActivatedRoute)
    const router = TestBed.inject(Router)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

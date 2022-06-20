import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from 'src/app/home/home/home.component';
import { HomeHeaderComponent } from 'src/app/_template/home-header/home-header.component';
import { TokenService } from '../token.service';

describe('TokenService', () => {
  let service: TokenService;
  let router:Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[HomeHeaderComponent],
      imports:[RouterTestingModule.withRoutes([
        {path:'home', component:HomeComponent}
      ])],
    });
    service = TestBed.inject(TokenService);
    router = TestBed.inject(Router)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be save and get the Token', () => {
    let token = "token"
    service.saveToken(token)
    expect(service.getToken()).toBe("token")
  });


});

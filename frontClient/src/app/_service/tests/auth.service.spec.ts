import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../auth.service';
import { ICredential } from 'src/app/_interface/credential';
import { IToken } from 'src/app/_interface/token';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers:[AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login should return a token', () => {
    let credential:ICredential = {
      mail: "marc.lamartine@test.com",
      password:'1234'
    }
    let acces_token:IToken = {acces_token:'12345AZERazer'}

    service.login(credential).subscribe(
      _token=>{
        expect(_token).toEqual(acces_token)
      },
      err=>console.log(err)
    )

    const req = httpMock.expectOne('http://localhost:5001/auth')
    req.flush({acces_token:'12345AZERazer'})
  });

});

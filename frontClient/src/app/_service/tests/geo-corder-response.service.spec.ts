import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GeoCorderResponseService } from '../geo-corder-response.service';
import { ICountry } from 'src/app/_interface/country';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('GeoCorderResponseService', () => {
  let service: GeoCorderResponseService;
  let httpMock:HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        // RouterTestingModule.withRoutes([]),
        RouterModule
       ],
      providers: [GeoCorderResponseService]
    });
    service = TestBed.inject(GeoCorderResponseService);
    httpMock= TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of countries', () => {
    let array:ICountry[] = service.getCountries()
    expect(array).toEqual(service.constryCode)
  })

  it('should return a country correct case', () => {
    let country:string = 'France'
    let code = service.getCountryCode(country)
    expect(code).toBe('FR')
  })

  it('should return a country non correct case', () => {
    let country:string = 'FRANCE'
    let code = service.getCountryCode(country)
    expect(code).toBe('FR')
  })

  it('should not return a country non correct case', () => {
    let country:string = 'azer'
    let code = service.getCountryCode(country)
    expect(code).toBe('Country not exist')
  })

  it('should return a geocode', () => {
    let address = '2 rue saint-Simon 64000 PAU'

    service.getLocation(address).subscribe(
      location=>{
        expect(location).toEqual({body:'N11455.Y1344'})
      },
      err=>console.log(err)
      )
    const req = httpMock.expectOne(`http://api.positionstack.com/v1/forward?access_key=${environment.apikey}&query=${address}`)
    req.flush({body:'N11455.Y1344'})
  })

  it('should return zip code around a post code', () => {
    let address = '64000'
    let dist = '5'
    let country = 'FR'
    let APIKey = '37f7d350-d6e5-11ec-a838-b3ee535e3951'

    service.getAroundPostCode(address,dist,country).subscribe(
      location=>{
        expect(location).toEqual({body:['64230','64300','64120']})
      },
      err=>console.log(err)
    )
    const req = httpMock.expectOne(`https://app.zipcodebase.com/api/v1/radius?apikey=${APIKey}&code=${address}&radius=${dist}&country=${country}`)
    req.flush({body:['64230','64300','64120']})
  })

});


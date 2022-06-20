import { TestBed, inject } from '@angular/core/testing';
import { RestaurantService } from '../restaurant.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IRestaurant, IRestaurants } from 'src/app/_interface/restaurant';
import { RouterTestingModule } from '@angular/router/testing';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let httpMock:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]) ],
      providers:[RestaurantService]
    });
    service = TestBed.inject(RestaurantService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Restaurant', () => {
    let restaurants:IRestaurants = {
      data: [{
        _id:'12345678',
        name:'laguinguette ',
        address:{
          street:"24 avenue de la boudronnée",
          postCode:"64000",
          city:"PAU",
          country:"FRANCE"
        },
        phone:'+33698909192',
        mail:'mat.leblanc@gmail.com',
        franchisedGroup:"Macdo",
        schedule:{}
      },
      {
        _id:'12345678567',
        name:'lebarducoin',
        address:{
          street:"23 avenue de la boudronnée",
          postCode:"21000",
          city:"DIJON",
          country:"FRANCE"
        },
        phone:'+33698779192',
        mail:'gerald.eric@gmail.com',
        franchisedGroup:"Macdo",
        schedule:{}
      }]
    }
    service.getRestaurant().subscribe(
      rest=>expect(rest).toEqual(restaurants)
    )

    let req = httpMock.expectOne('http://localhost:5001/restaurant/all')
    req.flush(restaurants)
    expect(req.request.method).toBe('GET')
  });

  it('should get restaurants of zipcodes', () => {
    let zipcodes = {zipCodes: [64000]}
    let restaurant:IRestaurant = {
      _id:'123456789',
      name:'string',
      address:{
        street: '23 rue du bonbon',
        postCode: 'string',
        city: 'string',
        country:'string'
      },
      phone:'string',
      mail:'string',
      franchisedGroup:'string',
      schedule:{}
    }

    let res = {found:true, data:[restaurant]}
    service.getRestaurantCities(zipcodes).subscribe(
      obj=>expect(obj).toEqual(res)
    )
    let req = httpMock.expectOne('http://localhost:5001/restaurant/zipCode')
    expect(req.request.method).toBe('POST')
    req.flush(res)
  });

});

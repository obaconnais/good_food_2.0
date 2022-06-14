import { TestBed } from '@angular/core/testing';
import { IRestaurant } from 'src/app/_interface/restaurant';

import { InterComponentCommunicationsService } from '../inter-component-communications.service';

describe('InterComponentCommunicationsService', () => {
  let service: InterComponentCommunicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterComponentCommunicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a message', () => {
    let message:IRestaurant = {
      _id:'123456789',
      name: 'le leaflet',
      address:{
        street: "boulevard des couettes",
        postCode: "64000",
        city: "PAU",
        country: "France"
      },
      phone:"0602030405",
      mail:"pirouette.cacahuète@gmail.com",
      franchisedGroup:"",
      schedule:{}
    }
    service.sendMessage(message)
    service.subject.subscribe(
      mess=>{
        expect(mess).toEqual(message)
      },
      err=>console.log(err)
    )
  });

  it('should get a message', () => {
    let message:IRestaurant = {
      _id:'123456789',
      name: 'le leaflet',
      address:{
        street: "boulevard des couettes",
        postCode: "64000",
        city: "PAU",
        country: "France"
      },
      phone:"0602030405",
      mail:"pirouette.cacahuète@gmail.com",
      franchisedGroup:"",
      schedule:{}
    }
    service.sendMessage(message)
    service.getMessage().subscribe(
      mes => expect(mes).toEqual(message),
      err=>console.log(err)
    )
  });
});

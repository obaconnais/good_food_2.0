import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { LoginTemplateComponent } from 'src/app/_template/login-template/login-template.component';

import { HomeBodyComponent } from './home-body.component';

describe('HomeBodyComponent', () => {
  let component: HomeBodyComponent;
  let fixture: ComponentFixture<HomeBodyComponent>;
  let ngbmod:NgbModal
  let store:MockStore
  let initialState:string = ""

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBodyComponent,LoginTemplateComponent ],
      imports:[
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
        NgbModule,
        CommonModule,
        BrowserModule
      ],
      providers:[
        CommonModule,
        BrowserModule,
        HomeBodyComponent,
        LoginTemplateComponent,
        provideMockStore({initialState}),MockStore
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    ngbmod = TestBed.inject(NgbModal)
    store = TestBed.inject(MockStore)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click on button should initiate Onclick()',()=>{
    component.setPostCode("")
    component.setCountry("")
    spyOn(component,'onClick')
    document.getElementById('valid')?.click()
    expect(component.onClick).toHaveBeenCalled()
  })

  it('country fill in but not zipCode',()=>{
    component.setPostCode("")
    component.setCountry("France")
    spyOn(component,'onClick')
    spyOn(component.getNgb(),'open').and.returnValue(ngbmod.open(LoginTemplateComponent,{centered:true}))
    document.getElementById('valid')?.click()
    expect(component.onClick).toHaveBeenCalled()
    expect(component.getNgb().open).toHaveBeenCalled()
  })

  it('country fill in and zipCode/getGeo_getcountry',()=>{
    component.setPostCode("64000")
    component.setCountry("France")
    spyOn(component.getGeo(),'getCountryCode').and.returnValue('FR')
    document.getElementById('valid')?.click()
    expect(component.getGeo().getCountryCode).toHaveBeenCalledWith(component.getCountry())
  })

  it('country fill in and zipCode/getGeo_AroundPostCode',()=>{
    component.setPostCode("64000")
    component.setCountry("France")
    spyOn(component.getGeo(),'getAroundPostCode').and.returnValue(new Observable<any>())
    document.getElementById('valid')?.click()
    expect(component.getGeo().getAroundPostCode).toHaveBeenCalledWith(component.getPostCode(),'5','FR')
  })

  it('country fill in and zipCode/getGeo_AroundPostCode',()=>{
    component.setPostCode("64000")
    component.setCountry("France")
    spyOn(component.getGeo(),'getAroundPostCode').and.callFake(()=>of({
      results : [{
        city: "Pau",
        city_en: null,
        code: "64000",
        distance: 0,
        state: "75",
        state_en: null
      }]
    }))
    spyOn(component.getRes(),'getRestaurantCities').and.returnValue(new Observable<{found:boolean,data:Object[]}>())
    document.getElementById('valid')?.click()
    expect(component.getRes().getRestaurantCities).toHaveBeenCalledWith({zipCodes:['64000']})
  })

  it('country fill in and zipCode/getNgb_open_data',()=>{
    component.setPostCode("64000")
    component.setCountry("France")
    spyOn(component.getGeo(),'getAroundPostCode').and.callFake(()=>of({
      results : [{
        city: "Pau",
        city_en: null,
        code: "64000",
        distance: 0,
        state: "75",
        state_en: null
      }]
    }))
    spyOn(component.getRes(),'getRestaurantCities').and.callFake(()=>of({
      found: false,
      data:[{
          _id:'2345678',
        name:'nametest',
        address:{
          street: '4 rue du bon test',
          postcode: '64000',
          city:'PAU',
          country:'France'
        },
        phone:'+33602878998',
        mail:'test.mail@yahouuu.fr',
        franchisedGroup:'',
        schedule:{}}
      ]
    }))
    document.getElementById('valid')?.click()
    expect(component.getRes().getRestaurantCities).toHaveBeenCalledWith({zipCodes:['64000']})
  })

  it('country fill in and zipCode/getNgb_open_Nodata',()=>{
    component.setPostCode("64000")
    component.setCountry("France")
    spyOn(component.getGeo(),'getAroundPostCode').and.callFake(()=>of({
      results : [{
        city: "Pau",
        city_en: null,
        code: "64000",
        distance: 0,
        state: "75",
        state_en: null
      }]
    }))
    spyOn(component.getRes(),'getRestaurantCities').and.callFake(()=>of({
      found: false,
      data:[]
    }))
    document.getElementById('valid')?.click()
    expect(component.getRes().getRestaurantCities).toHaveBeenCalledWith({zipCodes:['64000']})
  })

  it('country fill in and zipCode/getNgb_open_Nodata_modalcheck',()=>{
    component.setPostCode("64000")
    component.setCountry("France")
    spyOn(component.getGeo(),'getAroundPostCode').and.callFake(()=>of({
      results : [{
        city: "Pau",
        city_en: null,
        code: "64000",
        distance: 0,
        state: "75",
        state_en: null
      }]
    }))
    spyOn(component.getRes(),'getRestaurantCities').and.callFake(()=>of({
      found: false,
      data:[]
    }))
    document.getElementById('valid')?.click()
    expect(component.getRes().getRestaurantCities).toHaveBeenCalledWith({zipCodes:['64000']})
  })

});

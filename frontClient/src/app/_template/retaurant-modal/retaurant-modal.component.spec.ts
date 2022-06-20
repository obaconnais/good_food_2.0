import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IRestaurant } from 'src/app/_interface/restaurant';
import { RetaurantModalComponent } from './retaurant-modal.component';

describe('RetaurantModalComponent', () => {
  let component: RetaurantModalComponent;
  let fixture: ComponentFixture<RetaurantModalComponent>;
  let store:MockStore<string>;
  let initialState:string = "";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetaurantModalComponent ],
      imports:[
        NgbModule,
        RouterTestingModule.withRoutes([])
      ],
      providers:[NgbActiveModal,NgbModal,provideMockStore({initialState:{restaurant: initialState}}), MockStore]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetaurantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore)
    component.my_modal_content="content"
    component.my_modal_title="title"
    component.my_modal_style="style"
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('testing onclick response',()=>{
    let restaurant:IRestaurant={
      _id: '2345678',
      name: "la barouette à une roue",
      address: {
        street: '1 rue du bourbon',
        postCode: '64000',
        city: 'PAU',
        country: 'FRANCE'
      },
      phone: "+33602879831",
      mail: 'labarouette.roue@gmail.com',
      schedule: {},
      franchisedGroup: ''
    }
    spyOn(component.activeModal,'close')
    spyOn(component.store,'dispatch')

    component.onClick(restaurant)
    //test if method close have been called.
    expect(component.activeModal.close).toHaveBeenCalled()
    //test id behavior message have been send.
    component.messageService.getMessage().subscribe(mess=>{
      expect(mess).toEqual(restaurant)
    })
    //test if the store have been updated
    expect(component.store.dispatch).toHaveBeenCalled()
  });
});

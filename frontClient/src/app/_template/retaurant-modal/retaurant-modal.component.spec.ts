import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { RetaurantModalComponent } from './retaurant-modal.component';

describe('RetaurantModalComponent', () => {
  let component: RetaurantModalComponent;
  let fixture: ComponentFixture<RetaurantModalComponent>;
  let store:MockStore
  let initialState:string = ""
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetaurantModalComponent ],
      imports:[NgbModule],
      providers:[NgbActiveModal,NgbModal,provideMockStore({initialState}), MockStore]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetaurantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

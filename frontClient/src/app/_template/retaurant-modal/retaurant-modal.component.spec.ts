import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RetaurantModalComponent } from './retaurant-modal.component';

describe('RetaurantModalComponent', () => {
  let component: RetaurantModalComponent;
  let fixture: ComponentFixture<RetaurantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetaurantModalComponent ],
      imports:[NgbModule],
      providers:[NgbActiveModal,NgbModal]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetaurantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

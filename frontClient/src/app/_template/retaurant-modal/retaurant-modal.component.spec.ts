import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetaurantModalComponent } from './retaurant-modal.component';

describe('RetaurantModalComponent', () => {
  let component: RetaurantModalComponent;
  let fixture: ComponentFixture<RetaurantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetaurantModalComponent ]
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

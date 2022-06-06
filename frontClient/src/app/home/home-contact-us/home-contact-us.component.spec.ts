import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContactUsComponent } from './home-contact-us.component';

describe('HomeContactUsComponent', () => {
  let component: HomeContactUsComponent;
  let fixture: ComponentFixture<HomeContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeContactUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

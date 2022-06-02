import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMyaccountComponent } from './home-myaccount.component';

describe('HomeMyaccountComponent', () => {
  let component: HomeMyaccountComponent;
  let fixture: ComponentFixture<HomeMyaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMyaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMyaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

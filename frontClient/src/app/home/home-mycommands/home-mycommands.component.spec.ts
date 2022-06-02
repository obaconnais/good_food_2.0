import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMycommandsComponent } from './home-mycommands.component';

describe('HomeMycommandsComponent', () => {
  let component: HomeMycommandsComponent;
  let fixture: ComponentFixture<HomeMycommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMycommandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMycommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

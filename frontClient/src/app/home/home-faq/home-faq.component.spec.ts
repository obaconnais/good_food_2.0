import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFAQComponent } from './home-faq.component';

describe('HomeFAQComponent', () => {
  let component: HomeFAQComponent;
  let fixture: ComponentFixture<HomeFAQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFAQComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

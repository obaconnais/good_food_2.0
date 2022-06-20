import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HomeHeaderComponent } from 'src/app/_template/home-header/home-header.component';

import { HomeContactUsComponent } from './home-contact-us.component';

describe('HomeContactUsComponent', () => {
  let component: HomeContactUsComponent;
  let fixture: ComponentFixture<HomeContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeContactUsComponent, HomeHeaderComponent ],
      imports:[FormsModule]
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

  it('should getImg return url', () => {
    expect(component.getImg()).toBe("../assets/images/cuisine.jpeg")
  });

  it('should setImg return new url', () => {
    component.setImg("blabla")
    expect(component.getImg()).toBe("blabla")
  });
});

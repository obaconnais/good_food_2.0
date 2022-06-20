import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeHeaderComponent } from 'src/app/_template/home-header/home-header.component';

import { HomeAboutusComponent } from './home-aboutus.component';

describe('HomeAboutusComponent', () => {
  let component: HomeAboutusComponent;
  let fixture: ComponentFixture<HomeAboutusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAboutusComponent, HomeHeaderComponent ],
      imports: [ RouterModule, FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

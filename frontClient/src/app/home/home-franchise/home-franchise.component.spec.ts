import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFranchiseComponent } from './home-franchise.component';

describe('HomeFranchiseComponent', () => {
  let component: HomeFranchiseComponent;
  let fixture: ComponentFixture<HomeFranchiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFranchiseComponent ],
      imports:[HttpClientTestingModule],
      providers:[HomeFranchiseComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFranchiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

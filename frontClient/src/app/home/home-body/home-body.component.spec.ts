import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeBodyComponent } from './home-body.component';

describe('HomeBodyComponent', () => {
  let component: HomeBodyComponent;
  let fixture: ComponentFixture<HomeBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBodyComponent ],
      imports:[
        HttpClientTestingModule,
        NgbModule,
        FormsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers:[HomeBodyComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('no postCode fill in',()=>{
  //   spyOn(component.getNgb(),'open')
  //   component.postCode = ""
  //   component.onClick()
  //   expect(component.getNgb().open).toHaveBeenCalled
  // })
});

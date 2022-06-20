import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HomeFooterComponent } from '../_template/home-footer/home-footer.component';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router:Router
  let initialState:boolean
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent, HomeFooterComponent ],
      imports:[
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        FormsModule,
      ],
      providers:[
        provideMockStore({initialState}), MockStore
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

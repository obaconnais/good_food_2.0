import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeFooterComponent } from 'src/app/_template/home-footer/home-footer.component';
import { HomeHeaderComponent } from 'src/app/_template/home-header/home-header.component';
import { HomeComponent } from './home.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store:MockStore
  let initialState:string=''
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, HomeFooterComponent, HomeHeaderComponent ],
      imports:[
        FormsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers:[provideMockStore({initialState}), MockStore]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

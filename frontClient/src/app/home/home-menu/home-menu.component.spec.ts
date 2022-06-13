import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IRecipes } from 'src/app/_interface/recipe';
import { HomeMenuComponent } from './home-menu.component';

describe('HomeMenuComponent', () => {
  let component: HomeMenuComponent;
  let fixture: ComponentFixture<HomeMenuComponent>;
  let store:MockStore
  let initialState:IRecipes = {
    data:[]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMenuComponent ],
      imports:[HttpClientTestingModule],
      providers:[provideMockStore({initialState}), MockStore]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

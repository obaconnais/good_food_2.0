import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IRecipe, IRecipes } from 'src/app/_interface/recipe';
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
      imports:[HttpClientTestingModule, FormsModule],
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

  it('should dispatch on store', () => {
    let recipe:IRecipe = {
      _id:"23456",
      name:'blaf',
      ingredients:['bla'],
      price:12,
      restaurant_id:['234'],
      image_name:'dzeaf'
    }

    spyOn(store,'dispatch').and.callThrough()
    component.onClick(recipe)
    expect(store.dispatch).toHaveBeenCalled()

  });
});

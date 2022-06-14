import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IRecipe, IRecipes } from 'src/app/_interface/recipe';
import { CartComponent } from './home-cart.component';


describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let store:MockStore
  let recipe:IRecipe ={
      _id:'1234567',
      name: 'blabla',
      ingredients:['truc'],
      price:12,
      restaurant_id:['unid'],
      image_name:'image_name'
  }
  let initialState = [{}]
  initialState.push(recipe)

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      providers:[provideMockStore({initialState}),MockStore]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

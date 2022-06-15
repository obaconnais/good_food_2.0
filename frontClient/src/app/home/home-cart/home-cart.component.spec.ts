import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore, MockState } from '@ngrx/store/testing';
import { IRecipe, IRecipes } from 'src/app/_interface/recipe';
import { HomeFooterComponent } from 'src/app/_template/home-footer/home-footer.component';
import { HomeHeaderComponent } from 'src/app/_template/home-header/home-header.component';
import { CartComponent } from './home-cart.component';


describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let recipe:IRecipe ={
      _id:'1234567',
      name: 'blabla',
      ingredients:['truc'],
      price:12,
      restaurant_id:['unid'],
      image_name:'image_name'
  }
  let recipes:IRecipes={data:[recipe]}
  let initialState:IRecipes = recipes
  let store:MockStore

  // let store:MockStore<IRecipes>=new MockStore()
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent, HomeHeaderComponent, HomeFooterComponent ],
      imports:[
        FormsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers:[
        {provide: Store, useValue:provideMockStore({initialState})}
      ]
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

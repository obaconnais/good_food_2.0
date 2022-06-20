import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
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
  let Mockrecipes:IRecipes={data:[recipe]}
  let initialState:{recipe: IRecipes} = {recipe:Mockrecipes}
  let store:MockStore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent, HomeHeaderComponent, HomeFooterComponent ],
      imports:[
        FormsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers:[
        provideMockStore({initialState})
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
  })

  it('getKey() should return array of keys',() => {
    component.setRecipes([recipe],1,"12")
    let array = component.getKeys()
    expect(array).toEqual([recipe])
  })

  it('increment should dispatch on store',() => {
    spyOn(store,'dispatch').and.callThrough()
    component.increment(recipe)
    expect(store.dispatch).toHaveBeenCalled()
  })

  it('increment should dispatch on store',() => {
    spyOn(store,'dispatch').and.callThrough()
    component.increment(recipe)
    expect(store.dispatch).toHaveBeenCalled()
  })

  it('decrement should dispatch on store',() => {
    spyOn(store,'dispatch').and.callThrough()
    component.decrement(recipe)
    expect(store.dispatch).toHaveBeenCalled()
  })

  it('delete should dispatch on store',() => {
    spyOn(store,'dispatch').and.callThrough()
    component.delete(recipe)
    expect(store.dispatch).toHaveBeenCalled()
  })
});

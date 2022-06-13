import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IRecipes } from 'src/app/_interface/recipe';
import { CartComponent } from './home-cart.component';


describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let store:MockStore
  let initialState:IRecipes={
    data:[]
  }

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

import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IRecipes } from 'src/app/_interface/recipe';

@Component({
  selector: 'app-home-cart',
  templateUrl: './home-cart.component.html',
  styleUrls: ['./home-cart.component.css']
})
export class CartComponent implements OnInit {
  recipes$:Observable<IRecipes>
  test:any
  image = "../assets/images/good_food.jpeg"
  constructor(
    private store: Store<{ recipe: IRecipes }>,
  ) {
    this.recipes$ = this.store.select((state)=>state.recipe)
   }

  ngOnInit(): void {
    this.recipes$.subscribe(res=>this.test = res)
    console.log(this.test)
  }

  onClick():void{
    this.recipes$.subscribe(res=>console.log(res))
  }
}

import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IRecipe, IRecipes } from 'src/app/_interface/recipe';
import { recipeCollection } from 'src/app/_selector/test.selector';

@Component({
  selector: 'app-home-cart',
  templateUrl: './home-cart.component.html',
  styleUrls: ['./home-cart.component.css']
})
export class CartComponent implements OnInit {
  recipes$:Observable<IRecipes>
  constructor(
    private store: Store<{ recipe: IRecipes }>,
  ) {
    this.recipes$ = this.store.select((state)=>state.recipe)
   }

  ngOnInit(): void {

  }

  onClick():void{
    this.recipes$.subscribe(res=>console.log(res))
  }
}

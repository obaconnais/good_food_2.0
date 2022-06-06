import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IRecipe } from 'src/app/_interface/recipe';
import { recipeCollection } from 'src/app/_selector/test.selector';

@Component({
  selector: 'app-home-cart',
  templateUrl: './home-cart.component.html',
  styleUrls: ['./home-cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(
    private store: Store<{ recipe: IRecipe[] }>,
  ) { }

  ngOnInit(): void {

  }

  onClick():void{
    let produit$ = this.store.pipe(select(recipeCollection))
    console.log(produit$)
  }
}

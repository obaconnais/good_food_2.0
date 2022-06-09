import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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

  Total:Number = 0;

  constructor(
    private store: Store<{ recipe: IRecipes }>,
  ) {
    this.recipes$ = this.store.select((state)=>state.recipe)
    this.recipes$.subscribe(res=>{
      this.test=res
      for(let i=1;i<this.test.length;i++){
        this.Total += this.test[i].price
      }
    })
   }

  ngOnInit(): void {
  }

}

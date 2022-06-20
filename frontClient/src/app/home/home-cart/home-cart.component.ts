import { Component, OnInit } from '@angular/core';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddRecipe, DecrementRecipe, DeleteRecipe } from 'src/app/_actions/test.action';
import { IRecipe, IRecipes } from 'src/app/_interface/recipe';

@Component({
  selector: 'app-home-cart',
  templateUrl: './home-cart.component.html',
  styleUrls: ['./home-cart.component.css']
})
export class CartComponent implements OnInit {
  recipes$:Observable<IRecipes>

  test:any

  testLength:any

  recipes:Map<IRecipe,{nombre: Number, price:string}> = new Map()

  image = "../assets/images/good_food.jpeg"

  Total:Number = 0;

  keys:IRecipe[] =[]

  constructor(
    private store: Store<{ recipe: IRecipes }>
  ) {
    this.recipes$ = this.store.select((state)=>state.recipe)
   }

  ngOnInit(): void {
    this.recipes$.subscribe(res=>{
      this.test=res
      this.testLength=this.getLength(this.test)
      this.Total=0
      let tempMap:Map<IRecipe,{nombre:Number, price:string}> = new Map()
      for(let i=1;i<this.test.length;i++){
        this.Total += this.test[i].price
        let temp = tempMap.get(this.test[i])
        if(!temp)
          tempMap.set(this.test[i],{nombre:1, price:this.test[i].price})
        else{
          tempMap.set(this.test[i],{nombre:Number(temp.nombre)+1, price:this.test[i].price})
        }
      }
      this.recipes=tempMap
    })
    this.keys = this.getKeys()
  }

  getKeys():IRecipe[]{
    let iterator = this.recipes.keys()
    let array:IRecipe[] =[]
    this.recipes.forEach(()=>{
      array.push(iterator.next().value)
    })
    return array
  }

  //increment the store and display
  increment(rec:IRecipe):void{
    let allR:IRecipes = {data:[rec]}
    this.store.dispatch(AddRecipe({allRecipe:allR}))
  }

  //decrement the store and display
  decrement(rec:IRecipe):void{
    this.store.dispatch(DecrementRecipe({recipe:rec}))
  }

  //delete all recipe in the store
  delete(rec:IRecipe):void{
    this.store.dispatch(DeleteRecipe({recipe:rec}))
  }

  getLength(array:[IRecipe]):Number{
    return array.length
  }

  //use for mocking
  setRecipes(array:IRecipe[],value:Number, price:string):void{
    array.forEach(elt=>{
      this.recipes.set(elt,{nombre:value,price:price})
    })
  }
}

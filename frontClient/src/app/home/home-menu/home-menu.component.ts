import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRecipe, IRecipes } from 'src/app/_interface/recipe';
import { IRestaurant } from 'src/app/_interface/restaurant';
import { InterComponentCommunicationsService } from 'src/app/_service/inter-component-communications.service';
import { RecipeService } from 'src/app/_service/recipe.service';
import { Observable } from 'rxjs';
import { AddRecipe } from 'src/app/_actions/test.action';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent implements OnInit {
  image= "../assets/images/cuisine.jpeg"
  restaurant:IRestaurant = {
    _id:"",
    name:"",
    address:{street:'',postCode:'',city:'',country:''},
    phone:"",
    mail:"",
    franchisedGroup:"",
    schedule:{}
  }

  recipes:IRecipes =  {
    data: []
  }
  // data mocked for store test
  recipes$:Observable<IRecipes>

  constructor(
    public messageService:InterComponentCommunicationsService,
    public recipeService:RecipeService,
    private store: Store<{ recipe: IRecipes }>,
  ) {
      this.recipes$ =  this.store.select((state)=>state.recipe)
   }

  ngOnInit(): void {
    //bring the selected restaurant from body
    this.messageService.getMessage().subscribe(
      data => {
        this.restaurant=data
        //bring all the recipes from back
        this.recipeService.getRecipes(this.restaurant._id).subscribe(
          data => this.recipes = data
          ,
          err => console.log(err)
        )
      },
      err => {
        console.log(err)
      }
    )
  }

  onClick(recipe: IRecipe):void{
    this.store.dispatch(AddRecipe({allRecipe:{data:[recipe]}}))
  }
}

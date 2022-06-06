import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRecipe, IRecipes } from 'src/app/_interface/recipe';
import { IRestaurant } from 'src/app/_interface/restaurant';
import { InterComponentCommunicationsService } from 'src/app/_service/inter-component-communications.service';
import { RecipeService } from 'src/app/_service/recipe.service';
import { testAction } from 'src/app/_actions/test.action';
import { select } from '@ngrx/store';
import { recipe } from 'src/app/_selector/test.selector';

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

  albumIds$ = this.store.pipe(select(recipe))

  constructor(
    public messageService:InterComponentCommunicationsService,
    public recipeService:RecipeService,
    private store: Store<{ recipe: IRecipe[] }>,
  ) { }

  ngOnInit(): void {
    this.messageService.getMessage().subscribe(
      data => {

        this.restaurant=data
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
    let array:IRecipe[] = []
    array.push(recipe)
    console.log(array)
    this.store.dispatch(testAction({allRecipe: array}))
  }
}

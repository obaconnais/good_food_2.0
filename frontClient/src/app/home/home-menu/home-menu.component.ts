import { Component, OnInit } from '@angular/core';
import { IRestaurant } from 'src/app/_interface/restaurant';
import { InterComponentCommunicationsService } from 'src/app/_service/inter-component-communications.service';
import { RecipeService } from 'src/app/_service/recipe.service';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent implements OnInit {
  restaurant:IRestaurant = {
    id:"",
    name:"",
    address:{street:'',postCode:'',city:'',country:''},
    phone:"",
    mail:"",
    franchisedGroup:"",
    schedule:{}
  }
  test:IRestaurant = {
    id:"628bd294ebd84a3f859914b8",
    name:"le mulet fantastique",
    address:{street:'26 rue de l\'abattoir',postCode:'31000',city:'Toulouse',country:'France'},
    phone:"+33549124390",
    mail:"lemulet.fantastique@good-food.net",
    franchisedGroup:"",
    schedule:{}
  }

  constructor(
    public messageService:InterComponentCommunicationsService,
    public recipeService:RecipeService
    ) { }

  ngOnInit(): void {
    this.messageService.getMessage().subscribe(
      data => {
        this.restaurant=data
        this.recipeService.getRecipes().subscribe(
          data => console.log(data),
          err => console.log(err)
        )
      },
      err => {
        console.log(err)
      }
    )
  }

}

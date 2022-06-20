import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RecipeService } from '../recipe.service';
import { IRecipes } from 'src/app/_interface/recipe';
import { HomeFooterComponent } from 'src/app/_template/home-footer/home-footer.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('RecipeService', () => {
  let service: RecipeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[HomeFooterComponent],
      imports:[
        HttpClientTestingModule,
        FormsModule,
        RouterModule,
        RouterTestingModule.withRoutes([])
      ],
      providers:[RecipeService]
    });
    service = TestBed.inject(RecipeService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get recipes',() => {
    let recipes:IRecipes = {
      data : [{
        _id:'123456',
        name: 'jambon beurre',
        ingredients:['jambon'],
        price:12,
        restaurant_id:['345678'],
        image_name:'imagename'
      },
      {
        _id:'123456567',
        name: 'jambons beurres',
        ingredients:['jambons'],
        price:14,
        restaurant_id:['34567867'],
        image_name:'imagenames'
      }]
    }
    let idRest:string = "123456"

    service.getRecipes(idRest).subscribe(
      res=>expect(res).toEqual(recipes),
      err=>console.log(err)
    )

    let req = httpMock.expectOne(`http://localhost:5001/recipe/restaurant_id/${idRest}`)
    req.flush(recipes)
    expect(req.request.method).toBe('GET')

  });

});

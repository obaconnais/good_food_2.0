import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipes } from '../_interface/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private httpClient: HttpClient) { }
  /**
  *
  *get all recipes which correspond to the restaurant
  *send request to API to get restaurant with id
  *param:the id of the restaurant
  *return an Observable of Recipes
  */
  getRecipes(restId: string):Observable<IRecipes>{
    return this.httpClient.get<IRecipes>(`http://localhost:5001/recipe/restaurant_id/${restId}`)
  }
}

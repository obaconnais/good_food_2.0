import { createAction } from '@ngrx/store';
import { props } from '@ngrx/store';
import { IRecipe } from '../_interface/recipe';


export const testAction = createAction(
  "[Menu] add Recipe to cart ",
  props<{allRecipe:IRecipe[]}>()
)

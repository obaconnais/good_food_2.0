import { createAction } from '@ngrx/store';
import { props } from '@ngrx/store';
import { IRecipes } from '../_interface/recipe';


export const AddRecipe = createAction(
  "[HomeMenu Component] AddRecipe",
  props<{allRecipe:IRecipes}>()
)

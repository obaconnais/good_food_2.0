import { createSelector } from '@ngrx/store';
import { IRecipe } from '../_interface/recipe';
import { AppState } from '../_interface/app.state'

export const recipeSelector = (state: AppState) => state.recipe;

export const recipe = createSelector(
  recipeSelector,
  (recipe:IRecipe[])=>{
    return [...new Set (recipe.map((_)=>_._id))]
  }
)

export const recipeCollectionByRecipeId = (recipeId:string) => createSelector(
  recipeSelector,
  (recipe:IRecipe[]) => {
      if(recipeId == ''){
          return recipe;
      }
      return recipe.filter(_ => _._id == recipeId);
  })

  export const recipeCollection = createSelector(
    recipeSelector,
    (recipe:IRecipe[])=> recipe
  )


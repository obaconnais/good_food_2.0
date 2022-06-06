import { createReducer, on  } from "@ngrx/store";
import { testAction } from "../_actions/test.action";
import { IRecipe } from "../_interface/recipe";

export const initialState:ReadonlyArray<IRecipe>=[]


const _RecipeReduceur = createReducer(
  initialState,
  on(testAction,(state, {allRecipe})=>{
    return [...allRecipe]
  })
)

export function recipeReducer(state:any,action:any){
  return _RecipeReduceur(state,action)
}

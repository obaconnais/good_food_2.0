import { createReducer, on  } from "@ngrx/store";
import { AddRecipe } from "../_actions/test.action";


export const initialState = [{}]



export const _RecipeReduceur = createReducer(
  initialState,
  on(AddRecipe,(state, {allRecipe})=>{
    return [...state,...allRecipe.data]
  })
)

export function recipeReducer(state:any,action:any){
  return _RecipeReduceur(state,action)
}

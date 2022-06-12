import { createReducer, on  } from "@ngrx/store";
import { AddRecipe, DecrementRecipe, DeleteRecipe } from "../_actions/test.action";


export const initialState = [{}]



export const _RecipeReduceur = createReducer(
  initialState,
  on(AddRecipe,(state, {allRecipe})=>{
    return [...state,...allRecipe.data]
  }),
  on(DeleteRecipe,(state,{recipe})=>{
    return state.filter(rec=>rec !== recipe)
  }),
  on(DecrementRecipe,(state,{recipe})=>{
    let newState = [...state]
    console.log(newState)
    let index = newState.indexOf(recipe)
    newState.splice(index,1)
    console.log(newState)
    return newState
  })
)

export function recipeReducer(state:any,action:any){
  return _RecipeReduceur(state,action)
}

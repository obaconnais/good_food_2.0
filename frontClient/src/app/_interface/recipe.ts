export interface IRecipe {
  name: string,
  ingredients:[string],
  price:number,
  restaurant_id:[string]
}

export interface IRecipes{
  data:IRecipe[]
}

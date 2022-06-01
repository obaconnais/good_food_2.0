export interface IRecipe {
  name: string,
  ingredients:[string],
  price:number,
  restaurant_id:[string],
  image_name:string
}

export interface IRecipes{
  data:IRecipe[]
}

export interface IRecipe {
  _id:string,
  name: string,
  ingredients:[string],
  price:number,
  restaurant_id:[string],
  image_name:string
}

export interface IRecipes{
  data:IRecipe[]
}

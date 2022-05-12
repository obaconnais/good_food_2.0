export interface IRestaurant {
  id:string,
  name:string,
  address:string,
  phone:string,
  mail:string,
  franchisedGroup:string,
  schedule:object;
}

export interface IRestaurants{
  data: IRestaurant[]
}

export interface IRestaurantSingle{
  data: IRestaurant
}

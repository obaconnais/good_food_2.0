export interface IRestaurant {
  id:string,
  name:string,
  address:{"street":'',"postCode":'',"city":'',"country":''},
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

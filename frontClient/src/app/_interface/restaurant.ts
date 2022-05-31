export interface IRestaurant {
  id:string,
  name:string,
  address:IAdresse
  phone:string,
  mail:string,
  franchisedGroup:string,
  schedule:object;
}

export interface IAdresse{
  street: string,
  postCode: string,
  city: string,
  country:string
}

export interface IRestaurants{
  data: IRestaurant[]
}

export interface IRestaurantSingle{
  data: IRestaurant
}

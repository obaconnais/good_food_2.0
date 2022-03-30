export interface IUser{
  lastname: String,
  forname: String,
  mail: String,
  address: String
}

export interface IDataUsers{
  data: IUser[]
}

export interface IDateSingle{
  data: IUser
}

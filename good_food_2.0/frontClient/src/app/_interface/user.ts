export interface IUser {
  id:String,
  lastname: String,
  forname: String,
  mail: String,
  password: String
}

export interface IUsers{
  data: IUser[];
}

export interface ISingleUser{
  data: IUser;
}

export interface IUser {
  id:string,
  lastname: string,
  forname: string,
  mail: string,
  password: string
}

export interface IUsers{
  data: IUser[];
}

export interface ISingleUser{
  data: IUser;
}

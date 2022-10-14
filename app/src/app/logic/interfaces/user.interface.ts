import { IRole } from "./role.interface";

export interface IUser {
  _id?: string,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  role: IRole,
}

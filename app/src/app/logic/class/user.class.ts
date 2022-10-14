import { IRole } from "../interfaces/role.interface";
import { IUser } from "../interfaces/user.interface";

export class user implements IUser {
  constructor (
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
    public role: IRole,
    public _id?: string,
  ) {}

}

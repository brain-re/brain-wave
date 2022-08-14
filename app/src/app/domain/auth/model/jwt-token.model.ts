import { IRole } from "src/app/logic/interfaces/role.interface";

export class jwtToken {
  constructor (
    public user: string,
    public role: IRole[],
    public iat: number,
    public exp: number
  ) {}
}

export class jwtToken {
  constructor (
    public token?: string,
    public isAuthenticated: boolean = false
  ) {}
}

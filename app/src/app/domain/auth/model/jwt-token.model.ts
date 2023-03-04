export class jwtToken {
  constructor (
    public token: string|null = null,
    public isAuthenticated: boolean = false
  ) {}
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { credential } from "src/app/domain/auth/model/credential.model";
import { jwtToken } from "../model/jwt-token.model";

const JWT_LOCALE_KEY = 'jwt_mean_fr';
const HTTP_API = '/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token$: BehaviorSubject<jwtToken> = new BehaviorSubject(new jwtToken());

  constructor(private http: HttpClient) {
    // Autoload jwt token if it exist in user local storage
    this.init()
  }

  /**
   * Initialize local authentication token
   */
  public init(): void
  {
    const token = localStorage.getItem(JWT_LOCALE_KEY);
    if (token) {
      localStorage.setItem(JWT_LOCALE_KEY, token);
      this.token$.next(new jwtToken(token, true));
    }
  }

  /**
   * Register given json web token to local storage.
   *
   * Also input the token into shared token$ BehaviorSubject.
   * @param jwt A jwt token which should be register.
   */
  private registerJwt(jwt: string): void
  {
    localStorage.setItem(JWT_LOCALE_KEY, jwt);
    this.token$.next(new jwtToken(jwt, true));
  }

  /**
   * Try to login a user with given credentials.
   * @param credentials
   * @returns
   */
  public login(credentials: credential): Observable<jwtToken>
  {
    return this.http.post<{bearer: string}>(`${HTTP_API}/users/login`, credentials)
    .pipe(
      map((res: {bearer: string}) => res.bearer),
      tap((jwt: string) => this.registerJwt(jwt)),
      map(() => this.token$.value) // Return the token
    );
  }
}

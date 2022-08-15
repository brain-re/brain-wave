import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { credential } from "src/app/domain/auth/model/credential.model";
import { jwtToken } from "../model/jwt-token.model";

const HTTP_API = '/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token$: BehaviorSubject<jwtToken> = new BehaviorSubject(new jwtToken());

  constructor(private http: HttpClient) {}

  public login(credentials: credential): Observable<jwtToken>
  {
    return this.http.post<{bearer: string}>(`${HTTP_API}/users/login`, credentials)
    .pipe(
      map((res: {bearer: string}) => res.bearer),
      tap((token: string) => {
        this.token$.next(new jwtToken(token, true));
      }),
      map((token: string) => new jwtToken(token, true))
    );
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { credential } from "src/app/domain/auth/model/credential.model";

const HTTP_API = '/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  public login(credentials: credential): Observable<string>
  {
    return this.http.post<{bearer: string}>(`${HTTP_API}/users/login`, credentials)
    .pipe(
      map((res: {bearer: string}) => res.bearer),
      tap((token: string) => {
        this.token$.next(token);
      }),
      map((token: string) => token)
    );
  }
}

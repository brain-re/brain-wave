import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { user } from 'src/app/logic/class/user.class';
import { AuthService } from './auth.service';

const HTTP_API = '/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUser$: BehaviorSubject<user> = new BehaviorSubject(null);
  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.token$.pipe(
      tap(function(token) {
        if (null != token) {
          // There is a token
          this.refreshUser();
        }
      })
    ).subscribe()
  }

  public getCurrentUser(): Observable<user> {
    return this.http.get<user>(`${HTTP_API}/user/current`).pipe(
      tap((user: user) => this.currentUser$.next(user)),
      switchMap(() => this.currentUser$)
    );
  }

  public refreshUser(): void
  {
    this.getCurrentUser();
  }
}
